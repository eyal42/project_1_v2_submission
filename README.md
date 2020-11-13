# Udacity Project 1: Private Blockchain Application

This directory includes the following:

<ol>
<li>Implementation of the required methods in _block.js_ and _blockchain.js_ files:
<ol>
<li> **block.js**: *validate, getBData* </li>
<li> **blockchain.js**: *addBlock, requestMessageOwnershipVerification, submitStar, getBlockByHash, getBlockByHeight, getStarsByWalletAddress, validateChain* </li>
</ol}>
 </li>
</ol}>
2. Implementation of additinal methods in _blockchain.js_ and _BlockchainController.js_ files for testing purposes:
    a. _blockchain.js_: _tamperChain_
    b. _BlockchainController.js_: _getEmpty_, _tamperChain_, _validateChain_
3. Scripts for testing the implementation:
    a. _registerCassiopeiaOnChain_: This script will do the following
        1. load from the file cassiopeia_stars.json a list of 50 owners (names taken from a random name generator) with their WIF (again WIF addresses generated from random strings) and a list of 315 stars from the Cassiopeia constellation with the relevant details and a randomly assgined owner.
        2. For each star and assigned owner ask for a validation message from the blockchain (_requestMessageOwnershipVerification_), sign the message and register the star (_submitStar_)
    b. 
