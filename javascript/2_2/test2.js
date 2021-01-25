//'use strict'

function Const() {
    this.name = "qwe";
}

let a =  Const();

function fun() {
    console.log(this.name);
}
fun();