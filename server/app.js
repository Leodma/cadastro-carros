'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');


app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/car', routes);


app.get('/', function(require, response){
    response.json({message:'ola'});
});

app.post('/insertcar', function(require, response){
    response.json({message:require.body});
});






// app.delete('/removecar/:placa', function(req, res){
//     let carro, placa = req.params.placa;
//     carros.forEach(function(obj, index){
//         if(obj.placa === placa){
//             carro =  carros.splice(index, 1);;
            
//         };
//     })
//     res.send(carro);

// });



app.listen(port, function() {
  console.log('Listening on port http://localhost:%d', port);
});
