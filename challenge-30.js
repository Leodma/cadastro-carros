(function() {
  'use strict';
 /* controlar melhor o uso da imagem - verificar se é uma url
    inserir uma imagem padrão quando não tiver URL ou for uma URL inválida
    validar os campos dos formulários com HTML
    
 */ 
 function api(){

   const CompanyName = new DOM('[data-js="company-name"]');
   const CompanyPhone = new DOM('[ data-js ="company-phone"]');
   let inputsForm = new DOM ('input');
   let form = new DOM('[data-js="car-form"]');
   let table = new DOM('table');
   const ajax = new XMLHttpRequest();

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

   ajax.open('GET', 'company.json');
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
