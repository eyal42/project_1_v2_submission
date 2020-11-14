# Udacity Project 1: Private Blockchain Application

This directory includes the following:

<ol>
   <li>Implementation of the required methods in <em>block.js</em> and <em>blockchain.js</em> files:
   <ol>
     <li> <strong>block.js</strong>: <em>validate, getBData</em></li>
     <li> <strong>blockchain.js</strong>: <em>addBlock, requestMessageOwnershipVerification, submitStar, getBlockByHash, getBlockByHeight, getStarsByWalletAddress, validateChain</em></li>
    </ol>
   </li>
<li> Implementation of additinal methods in <em>blockchain.js</em> and <em>BlockchainController.js</em> files for testing purposes:
   <ol>
   <li> <strong>blockchain.js</strong>: <em>tamperChain</em></li>
   <li> <strong>BlockchainController.js</strong>: <em>getEmpty, tamperChain, validateChain</em></li>
   </ol>
</li>
<li> Scripts for testing the implementation:
<ol>
<li> <strong>registerCassiopeiaOnChain</strong>: This script will do the following </li>
<li>  load from the file cassiopeia_stars.json a list of 50 owners (names taken from a random name generator) with their WIF (again WIF addresses general from random strings) and a list of 315 stars from the Cassiopeia constellation with the relevant details and a randomly assgined owner </li>
</ol>
</li>
 <li>  For each star and assigned owner ask for a validation message from the blockchain (<em>requestMessageOwnershipVerification</em>), sign the message and register the star (<em>submitStar</em>)
</ol>
