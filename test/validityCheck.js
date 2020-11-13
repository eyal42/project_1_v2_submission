const needle = require('needle');
const SHA256 = require('crypto-js/sha256');

//var arguments = process.argv ; 
needle('get', 'http://localhost:8000/validate',{json:true})
    .then(res => {
        if(res.statusCode==200){
            let errLst=JSON.parse(res.body);
            if(errLst.length>0){
                console.log('Errors in following blocks:\n',errLst)
            }else{
                console.log('No errors identified')
            };
            return(errLst.length>0)
        }
        else{
            console.log('Error in validity check status code ',res.statusCode)
        }
    }).catch(err => {
        console.log(err);
    });

