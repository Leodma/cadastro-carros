(function() {
  'use strict';
 /* Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados, 
salvando-os temporariamente na memória de um servidor.

Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para 
que possamos utilizar para salvar as informações dos nossos carros.

Para utilizá-lo, você vai precisar fazer o seguinte:

- Via terminal, acesse o diretório `server`;
- execute o comando `npm install` para instalar as dependências;
- execute `node app.js` para iniciar o servidor.

Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço: 
`http://localhost:3000`

O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
As mudanças que você irá precisar fazer no seu projeto são:

- Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
`http://localhost:3000/car`
- Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
os seguintes campos:
  - `image` com a URL da imagem do carro;
  - `brandModel`, com a marca e modelo do carro;
  - `year`, com o ano do carro;
  - `plate`, com a placa do carro;
  - `color`, com a cor do carro.

Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
do pull request.
    
 */ 
 function api(){

   const CompanyName = new DOM('[data-js="company-name"]');
   const CompanyPhone = new DOM('[ data-js ="company-phone"]');
   let inputsForm = new DOM ('input');
   let form = new DOM('[data-js="car-form"]');
   let table = new DOM('table');
   const ajax = new XMLHttpRequest();


   function handleResponse(req){
     if (req.readyState === 4 &&  req.status === 200){
       return req.response;
     };
     return null
   };

   function fillNameCompany(data){
     CompanyName.setText(data.name);
     CompanyPhone.setText(data.phone);
   };

   function filltable(arrayObjetos){
    let carro =[];
    arrayObjetos.forEach(function(obj){
      for(let prop in obj){
        carro.push(obj[prop]);
      };
      table.insertLastRow(carro);
      carro = [];  
    });
   }

   function clearTable(table){

   }

   ajax.open('GET', 'company.json');
   ajax.send();
   ajax.addEventListener('loadend', function(){
       var data = JSON.parse(handleResponse(ajax));
       if(data)
         fillNameCompany(data);
       });
    
    function loadCars(){
      const ajaxCars = new XMLHttpRequest();
      ajaxCars.open('GET', 'http://localhost:3000/car');
      ajaxCars.send();
      ajaxCars.addEventListener('loadend', function(){
        let cars = JSON.parse(handleResponse(ajaxCars));
        if (cars)
        filltable(cars);
      });
    }

    

    function insertCar(car){ 
      let param = ['image=', car[0], '&',
                    'model=',car[1], '&',
                    'brandModel=', car[2], '&',
                   'year=', car[3], '&',
                   'plate=',car[4],'&',
                   'color=',car[5]];
        let insertRequest = new XMLHttpRequest();
        insertRequest.open('POST','http://localhost:3000/car' );
        insertRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        insertRequest.send(param.join(''));
        insertRequest.addEventListener('loadend', function(){
          let responsecar = handleResponse(insertRequest);
          if (responsecar){
             table.insertLastRow(car);
             return
          };
          alert("Essa placa já está cadatrada");
        })
      };

    
  table.on('click', function(event){
    let target = event.target;
    if(target.classList.contains('delete')){
      let placa = table.getCellContent(target.parentNode.rowIndex, 4); // pega o número da placa
      const deleterequest = new XMLHttpRequest();
      deleterequest.open('DELETE','http://localhost:3000/car/' + placa );
      deleterequest.send();
      deleterequest.addEventListener('loadend', function(){
          let removedcar = handleResponse(deleterequest);
          if (removedcar){
            console.log('removedcar:',removedcar);
            table.deleteRow(target.parentNode.rowIndex);
            return removedcar;
          };
          alert('carro não pode ser removido');
          return false;
      });
    };  
  });


  form.on('submit', function(event){
    event.preventDefault();
    insertCar(inputsForm.getValues());
    });  

  loadCars();

 };

 api();

})();
