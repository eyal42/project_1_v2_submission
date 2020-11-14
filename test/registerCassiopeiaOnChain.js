const bitcoin = require('bitcoinjs-lib') // v4.x.x
const bitcoinMessage = require('bitcoinjs-message')
const needle = require('needle');
const fs = require('fs');

function getAddressVerificationMessage(address){
  return needle('post','http://localhost:8000/requestValidation',
  {address:address})
      .then(res => {
          return(res.body);
      })
      .catch(err => {
          console.error(err);
      });
};
function signMessage(mykey,message){
  return new Promise(res => {
    signature = bitcoinMessage.sign(message,mykey.privateKey,mykey.keyPair.compressed).toString('base64');
    res({address:mykey.address,message:message,signature:signature});
  })
};
function submitStar(ans){
  return needle('post','http://localhost:8000/submitStar',ans)
      .then(res => {
          //console.log('inside: ',res.body);
          return(res.body);
      })
      .catch(err => {
          console.error(err);
      });
};
async function getMsg(mykey,star){
  return new Promise(async res => {
    message=await getAddressVerificationMessage(mykey.address);
    ans=await signMessage(mykey,message);
    ans.star=star;
    //console.log(JSON.stringify(ans));
    submission=await submitStar(ans);
    res(submission)
  })
}
async function submit (mykey,star){
  await getMsg(mykey,star)
}
function readFile(){
    return new Promise(async res => {
        let rawdata = fs.readFileSync('cassiopeia_stars.json');
        let stars = JSON.parse(rawdata);
        var mykeys={}
        for (ii in stars.owners){
            var keyPair = bitcoin.ECPair.fromWIF(stars.owners[ii].WIF);
            var {address} = bitcoin.payments.p2pkh({pubkey:keyPair.publicKey});
            mykeys[stars.owners[ii].owner]={
                keyPair:keyPair,
                privateKey:keyPair.privateKey,
                address:address
            }
        };
        res({stars:stars,mykeys:mykeys})
    });
};
async function loadData(){
    filedata=await readFile();
    //console.log(filedata.stars.cassiopeia.length);
    for (ii in filedata.stars.cassiopeia){
        mykey=filedata.mykeys[filedata.stars.cassiopeia[ii].owner];
        star=filedata.stars.cassiopeia[ii].star;
        //console.log(mykey.address,star);
        await submit (mykey,star);
    }
}
loadData();
