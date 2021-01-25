var fruit = 'Apple';
function getFruit() {
    console.log(this);
  return {
    fruit: 'Watermelon',
    name: this.fruit
  };
}

console.log(getFruit().name);