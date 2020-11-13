const needle = require('needle');
const SHA256 = require('crypto-js/sha256');

//var arguments = process.argv ; 
needle('get', 'http://localhost:8000/tamper',{json:true})
    .then(res => {
        if(res.statusCode==200){
            let tamperLst=JSON.parse(res.body);
            console.log(tamperLst.length);
        }
        else{
            console.log('Error while tampering chain!')
        }
    }).catch(err => {
        console.log(err);
    });

