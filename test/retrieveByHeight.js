const needle = require('needle');

var arguments = process.argv ; 
console.log(arguments[2]) ; 
needle('get', 'http://localhost:8000/block/height:'+arguments[2], { json: true })
    .then(res => {
        if(res.statusCode==200){
            console.log(res.body);
        }
        else{
            console.log('Problem!')
        }
    }).catch(err => {
        console.log(err);
    });

