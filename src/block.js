/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                                   // Hash of the block
		this.height = 0;                                                    // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');      // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                                      // Timestamp for the Block creation
		this.previousBlockHash = null;                                      // Reference to the previous Block Hash
    }
    
    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Note: to access the class values inside a Promise code you need to create an auxiliary 
     * value `let self = this;`
     */
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Save in auxiliary variable the current block hash
            const tmphash=this.hash;
            this.hash='';  
            // Recalculate the hash of the Block
            let newhash=`${SHA256(JSON.stringify(this))}`;
            // Comparing if the hashes changed
            // Returning the Block is not valid            
            // Returning the Block is valid
            this.hash=tmphash; 
            if(newhash==tmphash){
                resolve(true);
            }
            else{
                resolve(false)
            }
        });
    }

    /**
     *  Auxiliary Method to return the block body (decoding the data)
     */
    getBData() {
        // Getting the encoded data saved in the Block
        // Decoding the data to retrieve the JSON representation of the object
        // Parse the data to an object to be retrieve.

        // Resolve with the data if the object isn't the Genesis block
        // In case of Gensis block will  rerject with an error
        return new Promise((resolve, reject) => {
            if (this.height===0){
                resolve.status(500).send(err);
            }
            else{
                try{
                    resolve(JSON.parse(hex2ascii(this.body)))
                }catch(err){
                    resolve.status(507).send(err)
                }
            }
        });
    }

}

module.exports.Block = Block;                    // Exposing the Block class as a module