'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

  
function $Promise(executor){
    if(typeof executor != "function")  throw TypeError("executor its not a function")
    this._state="pending";
    this._value=undefined;
    this._handlerGroups=[];
  
    executor(this._internalResolve.bind(this),this._internalReject.bind(this))
   
}
$Promise.prototype.catch=function(errorCb){
    this.then(null,errorCb);
}
$Promise.prototype.then=function(successCb,errorCb){
    if(typeof successCb!="function" )successCb=false;
    if( typeof errorCb!="function")errorCb=false;
    let obj={
        successCb:successCb,
        errorCb:errorCb
    }
    this._handlerGroups.push(obj);

    if(this._state !="pending"){
        this._callHandlers();
    }
}
$Promise.prototype._callHandlers=function(){
   while(this._handlerGroups.length > 0){
        let obj_actual=this._handlerGroups.shift()
        if(this._state === "fulfilled"){
           obj_actual.successCb && obj_actual.successCb(this._value)
        }
        if(this._state==="rejected"){
            if(obj_actual.errorCb)  obj_actual.errorCb(this._value)
        }     
    }
}
$Promise.prototype._internalResolve=function(data){
    if(this._state==="pending"){
        this._state="fulfilled";
        this._value=data;
        this._callHandlers();
    }
}
$Promise.prototype._internalReject=function(razon){
    if(this._state==="pending"){
        this._state="rejected";
        this._value=razon;
        this._callHandlers();
    }
}




//module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
