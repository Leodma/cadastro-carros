'use strict';

var express = require('express');
var router = express.Router();
var data = [{
  image: "http://blogadhesivoindustrial.com/wp-content/uploads/2018/04/vida-util-pecas-carro.jpg",
  brandModel: "VW",
  model:"fusca",
  year: "1965",
  plate: "ABC-1234",
  color: "blue"
}];



router.get('/', function(req, res) {
  console.log('[GET] /car:', data)
  res.json(data);
});


router.delete('/:placa', function(req, res){
  let placa = req.params.placa;
  let index = data.findIndex(function(obj, index){
    return obj.plate == placa;
  });
  data.splice(index, 1);
  res.json({message:'Carro excluído', data: placa});
});

router.post('/', function(req, res) {
  //verificar se a placa já existe
  let placa = data.find(function(obj){
    return obj.plate === req.body.plate;
  });
 
  if(placa === undefined){
    data.push({
      image: req.body.image,
      model: req.body.model,
      brandModel: req.body.brandModel,
      year: req.body.year,
      plate: req.body.plate,
      color: req.body.color
    });
    res.json({ message: 'success', data:data });
    return
  };
    res.status(404).json({message:'error - Placa já cadatrada'});
  
});


module.exports = router;
