Object.prototype.serialize = function () {};
var student = {
  name: 'Ivan',
  getName: function () { return this.name; }
};

Object.defineProperty(student, 'type', {
  enumerable: false,
  value: 'student'
});

for (var key in student) {
  console.log(key);
}