const needle = require('needle');
const hex2ascii = require('hex2ascii');

var arguments = process.argv ; 
console.log(arguments[2]) ; 
needle('get', 'http://localhost:8000/block/height:'+arguments[2], { json: true })
    .then(res => {
        if(res.statusCode==200){
            console.log(JSON.parse(hex2ascii(res.body.body)));
        }
        else{
            console.log('Status Code:',res.statusCode,' ',res.body)
        }
    }).catch(err => {
        console.log(err);
    });

