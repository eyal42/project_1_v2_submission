const needle = require('needle');

var arguments = process.argv ; 
needle('get', 'http://localhost:8000/block/hash:'+arguments[2], { json: true })
    .then(res => {
        if(res.statusCode==200){
            console.log(res.body);
        }
        else{
            console.log('Status Code:',res.statusCode,' ',res.body)
        }
    }).catch(err => {
        console.log(err);
    });

