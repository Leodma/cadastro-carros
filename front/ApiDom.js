(function(win, doc){
    'use strict';

    function DOM(texto){
        this.element = doc.querySelectorAll(texto);
        if (this.element.length === 1)
            this.element = this.element.item(0);
      };
      
    DOM.prototype.on = function on(evento, fn){return this.element.addEventListener(evento, fn, false);};
    DOM.prototype.getElement = function get(){return this.element;};
    DOM.prototype.getValue = function value(){return this.element.value}; // for a single node
    DOM.prototype.getValues = function getValues(){ // for nodelists
        let arr = [];
        this.element.forEach(function(el){
            arr.push(el.value);
        });
        return arr;
    };
    DOM.prototype.setText = function setText(texto){ this.element.innerHTML = texto};
    DOM.prototype.insert = function insert(child) {this.element.appendChild(child)};
    DOM.prototype.cleanValue = function cleanValue(){this.element.value = ""};
  
    DOM.prototype.remove = function remove() {
    let child = this.element.firstElementChild;
    if (child)
        this.element.removeChild(child);
    };


    function showImage(url){
        let fragment = doc.createDocumentFragment();
        var img = document.createElement('img');  
        img.setAttribute('src', url);
        img.onerror = function(){ img.setAttribute('src', 'noimage.jpg');}
        fragment.appendChild(img);
        return fragment;
    };

    DOM.prototype.insertLastRow = function insertLastRow(dataList){
        if (this.element.nodeName === "TABLE"){
            let row = this.element.insertRow(-1);
            let cell;
            dataList.forEach(function(el, index){
                cell = row.insertCell(index);
                if (index === 0){
                    cell.appendChild(showImage(el))
                }else{
                    cell.innerHTML = el;
                }
            });
            cell = row.insertCell(dataList.length);
            cell.classList.add("delete");
            return;
        };
        console.log('esse elemento não é uma tabela');
        return;
    };

    DOM.prototype.deleteRow = function deleteRow(el){
        if (this.element.nodeName === "TABLE"){
            this.element.deleteRow(el);
            return
        };
        console.log('esse elemento não é uma tabela');
        return;
    };

    DOM.prototype.getCellContent = function(row,cell){
        if (this.element.nodeName === "TABLE"){
            return this.element.rows[row].cells[cell].innerHTML;
        };
        console.log('esse elemento não é uma tabela');
        return;
    };
    


    win.DOM = DOM;
})(window, document);