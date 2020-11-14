const needle = require('needle');

needle('get', 'http://localhost:8000/block/hash:'+'887de98ea9aee704f889212b037dbfa853a582c68ddf503b73f39241ef10f6b2', { json: true })
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

