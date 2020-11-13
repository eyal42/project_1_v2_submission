# Udacity Project 1: Private Blockchain Application

This directory includes the following:

<ol>
   <li>Implementation of the required methods in _block.js_ and _blockchain.js_ files:
   <ol>
     <li> **block.js**: *validate, getBData* </li>
     <li> **blockchain.js**: *addBlock, requestMessageOwnershipVerification, submitStar, getBlockByHash, getBlockByHeight, getStarsByWalletAddress, validateChain*      </li>
    </ol}>
   </li>
<li> Implementation of additinal methods in _blockchain.js_ and _BlockchainController.js_ files for testing purposes:
   <ol>
   <li> _blockchain.js_: _tamperChain_ </li>
   <li> _BlockchainController.js_: _getEmpty_, _tamperChain_, _validateChain_ </li>
   </ol>
</li>
<li> Scripts for testing the implementation:
<ol}>
<li> _registerCassiopeiaOnChain_: This script will do the following </li>
<li>  load from the file cassiopeia_stars.json a list of 50 owners (names taken from a random name generator) with their WIF (again WIF addresses general from random strings) and a list of 315 stars from the Cassiopeia constellation with the relevant details and a randomly assgined owner </li>
</ol}>
</li>
 <li>  For each star and assigned owner ask for a validation message from the blockchain (_requestMessageOwnershipVerification_), sign the message and register the star (_submitStar_)
</ol}>
