const needle = require('needle');

needle('get', 'http://localhost:8000/blocks/'+'1L3YqLSkL5K7g6LxE8UDNmJU39Xp66BYrV', { json: true })
    .then(res => {
        if(res.statusCode==200){
            console.log(res.body);
        }
        else{
            console.log('Problem! statusCode:',res.statusCode,res.body)
        }
    }).catch(err => {
        console.log(err);
    });