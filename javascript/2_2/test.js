function myInstanceof(obj, Class) {
    let objPrototype = obj;
    let classPrototype = Class.prototype;
    while (true)
    {
        objPrototype = objPrototype.__proto__;
        if (objPrototype === classPrototype) {
            return true;
        }
        if (objPrototype === null) {
            return false;
        }
    }
}

let personProto = {}
let studentProto = Object.create(personProto);
studentProto.create = function(name) {
    return Object.create(studentProto, 
        {
            name : {value:name, enumerable:true, writable:true, configurable:true}
        });
}
studentProto.printName = function(){
    console.log(this.name);
}

let st1 = studentProto.create("1");
let st2 = st1.create("2");

st1.printName();
st2.printName();

console.log(st1.__proto__ === studentProto);
console.log(st2.__proto__ === studentProto);