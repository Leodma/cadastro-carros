(function() {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
 function api(){

   const CompanyName = new DOM('[data-js="company-name"]');
   const CompanyPhone = new DOM('[ data-js ="company-phone"]');
   let inputsForm = new DOM ('input');
   let form = new DOM('[data-js="car-form"]');
   const button = new DOM('button');
   let table = new DOM('table');
   const ajax = new XMLHttpRequest();
  //  const handleTable = new handleHTMLTable();
 
   function handleResponse( ){
     if (ajax.readyState === 4 &&  ajax.status === 200){
       return ajax.response;
     };
     return null
   };

   function fillNameCompany(data){
     CompanyName.setText(data.name);
     CompanyPhone.setText(data.phone);
   };

 
   ajax.open('GET', 'http://127.0.0.1:5500/challenge-29/company.json');
   ajax.send();
   ajax.addEventListener('loadend', function(){
       var data = JSON.parse(handleResponse());
       if(data)
         fillNameCompany(data);
       });
    

    table.on('click', function(event){
      let target = event.target;
      if(target.classList.contains('delete')){
       table.deleteRow(target.parentNode.rowIndex);
      };
    });

    form.on('submit', function(event){
      event.preventDefault();
      table.insertLastRow(inputsForm.getValues());
      });
   
 };


 api();

})();
