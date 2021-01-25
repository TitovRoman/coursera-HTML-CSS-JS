function getFruitsCost() {
    var cost = 7;
    console.log(this);
    return function(count) {
      return cost * count;
    };
    
}
var getCost = getFruitsCost();
var price = getCost(10);

console.log(price);

console.log(this);