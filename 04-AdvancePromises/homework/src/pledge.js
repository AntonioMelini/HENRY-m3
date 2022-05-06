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
   return this.then(null,errorCb);
}
$Promise.prototype.then=function(successCb,errorCb){
    if(typeof successCb!="function" )successCb=false;
    if( typeof errorCb!="function")errorCb=false;
    let downstreamPromise= new $Promise(function(){})
    let obj={
        successCb:successCb,
        errorCb:errorCb,
        downstreamPromise
    }
    this._handlerGroups.push(obj);

    if(this._state !="pending"){
        this._callHandlers();
    }
    
        return downstreamPromise;
    
    
}
$Promise.prototype._callHandlers=function(){
   while(this._handlerGroups.length > 0){

        let obj_actual=this._handlerGroups.shift()
        let downstreamPromise=obj_actual.downstreamPromise;

        if(this._state === "fulfilled"){
            if(!obj_actual.successCb){  
                downstreamPromise._internalResolve(this._value)
            }else{
                try {
                    let resultado=obj_actual.successCb(this._value)
                if(resultado instanceof $Promise){
                    resultado.then((value)=>{
                        downstreamPromise._internalResolve(value)
                    },(razon)=>{
                        downstreamPromise._internalReject(razon)
                    })
                }else{
                    downstreamPromise._internalResolve(resultado)
                }
                } catch (error) {
                    downstreamPromise._internalReject(error)
                    
                }
                
            }
        }
        if(this._state==="rejected"){
            if(!obj_actual.errorCb){  
                downstreamPromise._internalReject(this._value)
            }else{
                try {
                    let resultadoerror=obj_actual.errorCb(this._value)
                if(resultadoerror instanceof $Promise){
                    resultadoerror.then((value)=>{
                        downstreamPromise._internalResolve(value)
                    },(razon)=>{
                        downstreamPromise._internalReject(razon)
                    })
                }else {
                    downstreamPromise._internalResolve(resultadoerror)
                }
                } catch (error) {
                    downstreamPromise._internalReject(error)
                    
                }
                
            }
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
