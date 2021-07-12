# 需手写实现的方法

## 1. instanceof

``` js
function myInstanceof(leftValue,rightValue){
    let leftProto = leftValue.__proto__;
    const rightProto = rightValue.Prototype;
    while(true){
        if(leftProto === null){
            return false;
        }
        if(leftProto === rightProto){
            return true;
        }
        leftProto = leftProto.__proto__;
    }
}
```
## 2.call
```js
Function.prototype.myCall=function (context = globalThis,...args){
    const key = Symbol("key");
    context[key] = this;
    const returnValue = context[key](...args);
    delete context[key]
    return returnValue;
}
```
## 3.发布订阅
```js
    class Events{
        constructor (){
            this._events = {}
        }
        on (name,fn,...argOrg) {
            if(!name || !fn){
                return throw new Error("name/fn")
            }
            let fns = this._events[name] || [];
            if(fns.find(item=>item.fnOrg === fn)){return}
            this._events = fns.concat({
                fn:(...args)=>{fn.apply(null,[...argOrg,...args])},
                fnOrg:fn
            })
        }
        emit(name,...args){
            (this._events[name] || []).forEach((item)=>{
                item.fn(...args)
            })
        }
        off(name,fn){
            if(arguments.length === 0){
                this._events = {}
            }
            if(arguments.length ===1){
                delete this._events[name]
            }
            let fns = this._events[name] || [];
            this._events[name] = fns.filter(item=>{
                item.fnOrg ! == fn
            })
        }
        once(name,fn,...argOrg){
            let onFn = (...args)=>{
                fn.apply(null,args)
                this.off(name,onFn)
            }
            
            this.on(name,onFn,...argOrg)
        }
    }
```
## 4.数组扁平化
```js
    function arrFlat(arr){
        while(arr.some(item=>Array.isArray(item))){
            arr = [].concat(...arr)
        }
        return arr
    }
```

## 5.对象扁平化
```js
    function objFlat(obj){
        const typeCheck = (val)=> {
            return /(?<obj>Object) (?<type>[a-zA-Z]+)/.exec(Object.prototype.toString(val)).groups.type
        }
        const returnValue = {}
        (function getKeyFn(v,char){
            for (let key in v){
                let newChar = char ? `${char}.${key}` : key;
                if(typeCheck(v[key]) === "Object"){
                    returnValue[newChar] = getKeyFn(v[key],newChar)
                }else{
                    retrunValue[newChar] = v[key]
                }
            }
        
        })(obj,'')
        return returnValue
    }
```
## 6. 单例模式
```js
    var Singleton = (function(){
    function H(){}
    var instance = null;
    return function(){
        if(instance){retrun instance}
        instance = new H()
        return instance;
    }
})()
```
## 7.函数柯里化
```js
    function curry(handler,...args){
        let allArguments = args;
        let fn = function(){
              allArguments.push(...arguments);
              return fn;
        }
        fn.toString = function (){
           return allArguments.reduce(handler) 
        }
        
        return fn
    }
```
## 8.数组随机乱序
```js
    function sortRandom(arr){
        return arr.sort(function(a,b){
            return Math.random()>0.5 ? 1 : -1;
        })
    }
```
## 9.deepCopy
```js
    function deepCopy(value){
        const checkType = v => /(?<obj>object) (?<type>[a-zA-Z]+)/.exec(Object.prototype.toString.call(v)).groups.type
       const type = checkType(value)
       if(type === "Date") return new Date(value)
       if(type ==="RegExp") return new RegExp(value)
       if(type ==="Function") return new Function('return ' + value.toString()).call(this)
       if(type === "Array"){
           let arr = []
           for(let k in value){
               arr[k] = deepCopy(value[k])
           }
       }
       if(type === "Object"){
           let obj = {}
           for(let k in value){
               if(value.hasOwnProperty(k)){
                   obj[k] = deepCopy(value[k])
               }
           }
           return obj
       }
       if(type === "Set"){
           let s = new Set()
           for(let val in value.values()){
               s.add(deepCopy(val))
           }
           return s
       }
       if(type === "Map"){
           let m = new Map()
           value.forEach((v,k)=>{
               m.set(k,deepCopy(v))
           })
           return m
       }
       return value
       //if(type === "String" || type === "Number"||type === "Boolean" || type === "Undefined" || type ==="Null") return value
    }
```
## 10.trim()
```javascript
    String.prototype.myTrim= function(){
        return this.replace(/^\s\s*/,'').replace(/\s\s*$/,'')
    }
```