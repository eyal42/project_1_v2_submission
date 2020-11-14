# Udacity Project 1: Private Blockchain Application

This directory includes the following:
<ol>
    <li>Implementation of the <strong style="color:Tomato;">required methods</strong> in <em>block.js</em> and <em>blockchain.js</em> files:
        <ol style="color:SlateGray">
            <li> <strong>block.js</strong>: <em>validate, getBData</em></li>
            <li> <strong>blockchain.js</strong>: <em>addBlock, requestMessageOwnershipVerification, submitStar, getBlockByHash, getBlockByHeight, getStarsByWalletAddress, validateChain</em></li>
        </ol>
    </li>
    <li> Implementation of <strong style="color:Tomato;">additinal testing methods</strong> in <em>blockchain.js</em> and <em>BlockchainController.js</em> files:
       <ol style="color:SlateGray">
       <li> <strong>blockchain.js</strong>:
        <ol>
            <li><em>tamperChain</em>: a function looping through the chain corrupting the <em>hash</em> every 113 blocks and <em>previousBlockHash</em> every 31 </li>
        </ol>
       </li>
       <li> <strong>BlockchainController.js</strong>:
        <ol>
            <li><em>getEmpty</em>: endpoint for a simple connectivity check between controlloer and blockchain</li>
            <li><em>tamperChain</em>: endpoint to access <em>blockchain.tamperChain</em> method mentioned above</li>
            <li><em>validateChain</em>: endpoint to access <em>blockchain.validateChain</em>  method</li>
        </ol>
        </li>
       </ol>
    </li>
    <li> Scripts for <strong style="color:Tomato;">testing</strong> the implementation:
    <ol style="color:SlateGray">
        <li> <strong>registerCassiopeiaOnChain.js</strong>: This script will do the following:
        <ol>
            <li>  Load from the file cassiopeia_stars.json a list of 50 owners (names taken from a random name generator) with their WIF (again WIF addresses general from random strings) and a list of 315 stars from the Cassiopeia constellation with the relevant details and a randomly assgined owner </li>
             <li>  For each star and assigned owner ask for a validation message from the blockchain via <em>blockchain.requestMessageOwnershipVerification</em>, sign the message using the <em>bitcoinjs-message</em> library, and register the star via <em>blockchain.submitStar</em></li>
        </ol>
        </li>
        <li> <strong>retrieveByHash.js</strong>: retrieve the block coresponding to hash or return error</li>
        <li> <strong>retrieveByHeight.js</strong>: retrieve the block at the requested height or return error</li>
        <li> <strong>retrieveBodyByHeight.js</strong>: retrieve and decode the data in the block at the requested height or return error</li>
        <li> <strong>getStarsByWalletAddress.js</strong>: Return the list of stars owned by the given address</li>
        <li> <strong>validityCheck.js</strong>: Returns a list of tampered blocks, either the <em>hash</em> entry not coresponding to the hash of the block (wthout the hash entry) or <em>previousBlockHash</em> entry not corresponding to hash entry of previous block</li>
        <li> <strong>tamperChain.js</strong>: This script modifies the hash entry for every 113 blocks and every <em>previousBlockHash</em> every 31 blocks</li>
    </ol>
    </li>
    <li>Test <strong style="color:Tomato;">screenshots</strong>:
    <ol style="color:SlateGray">
        <li> Scripts: snapshots of console for command line runs of test scripts </li>
        <li> Postman: snapshots of desktop Postman app sending POST and GET queries to blockchain </li>
    </ol>
    </li>
</ol>
