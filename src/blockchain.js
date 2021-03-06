/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
var bitcoin = require('bitcoinjs-lib') // v4.x.x
var bitcoinMessage = require('bitcoinjs-message');

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialized the chain creating
     * the Genesis Block.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    _addBlock(block) {
        let self = this;
        return new Promise(async (resolve,reject) => {
            try {
                if (this.height==-1){
                    block.previousBlockHash=null;
                } else {
                    block.previousBlockHash=self.chain[this.height].hash;
                }
                this.height+=1;
                block.height=this.height;
                block.time=new Date().getTime().toString().slice(0,-3);
                block.hash='';
                block.hash=`${SHA256(JSON.stringify(block))}`;
                self.chain.push(block);
                //console.log('validate block #',block.height,'-',await block.validate());
                resolve(block)//.validate())
            } catch (error) {
                console.log('Error: _addBlock fail');
                resolve(error)
            }
        });
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            let mymessage=address+`:${new Date().getTime().toString().slice(0,-3)}:starRegistry`;
            //console.log(mymessage);
            resolve(mymessage)
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {
        let self = this;
        let msgTime=parseInt(message.split(':')[1]);
        let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));
        let diff=currentTime-msgTime;
        let myverification=bitcoinMessage.verify(message,address,signature);
        return new Promise(async (resolve, reject) => {
            if(diff<300){
                let block = new BlockClass.Block({data: {owner:address,signature:signature,star:star}});
                await this._addBlock(block);
                resolve(block);
            } else {
                resolve.status(500).send("Error! Unable to add block")
                //resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block=self.chain.filter(b=> b.hash===hash)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(p => p.height === height)[0];
            if(block){
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    async getStarsByWalletAddress(address) {
        let self = this;
        let stars = [];
        return new Promise(async (resolve, reject) => {
            var body;
            for (let jj=1;jj<=(self.height);jj++){
                let block=self.chain[jj];
                body=await block.getBData();
                if (body.data.owner===address){
                    stars.push({owner:body.data.owner,star:body.data.star})
                }
            };
            resolve(stars);
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     */
    async validateChain() {
        let self = this;
        return new Promise(async (resolve) => {
            let errorLog = [];
            let prev_hash=self.chain[0].hash;
            for (let jj=1;jj<=(self.height);jj++){
                let block_valid=await self.chain[jj].validate();
                if((!block_valid)||(prev_hash!==self.chain[jj].previousBlockHash)){
                    errorLog.push(self.chain[jj]);
                }
                prev_hash=self.chain[jj].hash
            };
            resolve(errorLog);
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * This method will tamper with the chain both on ther hash level and on signitures,
     * which will be used to test the validateChain method.
     */
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    async tamperChain() {
        let self = this;
        return new Promise(async (resolve) => {
            let corruptionLog = [];
            for (let jj=1;jj<=(self.height);jj++){
                if(!(jj%113)){
                    let tmp=self.chain[jj].hash;
                    self.chain[jj].hash=tmp.slice(30,65)+tmp.slice(0,30)
                    corruptionLog.push(self.chain[jj]);
                }
            if(!(jj%31)){
                    let tmp=self.chain[jj].previousBlockHash;
                    self.chain[jj].previousBlockHash=tmp.slice(30,64)+tmp.slice(0,30)
                    corruptionLog.push(self.chain[jj]);
                }
            };
            resolve(corruptionLog);
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

}

module.exports.Blockchain = Blockchain;   