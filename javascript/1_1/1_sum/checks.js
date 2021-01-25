// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var sum = require('./index.js');

assert.equal(sum(12, 33), 45, 'При сложении 12 и 33 получится 45');
assert.equal(sum(101, '17'), 118, 'При сложении 101 и 17 получится 118');
assert.equal(sum(101, '17.q'), NaN, 'При сложении 101 и 17.q получится NaN');
assert.equal(sum('17.q', '17.q'), NaN, 'При сложении 101 и 17.q получится NaN');
assert.equal(sum(101, '17.q'), NaN, 'При сложении 101 и 17.q получится NaN');
console.info('OK!');

console.info('2');

console.info('3');
