function delay(ms) {
   return new Promise(resolve => setTimeout(resolve, ms)); 
}   

function funToPromise(fun, manyArgs = false) {
    
    return function(...args){

        return new Promise((resolve, reject) => {
            function callback(err, ...arg) {
                if (err) {
                    reject(err);
                } else {
                    if (manyArgs) {
                        resolve(arg);
                    } else {
                        resolve(arg[0]);
                    }
                    
                }
            }
            fun.call(this, ...args, callback);
        })
    }
}

class Thenable {
    constructor(num) {
      this.num = num;
    }
    then(resolve, reject) {
      console.log(resolve);
      // выполнить resolve со значением this.num * 2 через 1000мс
      setTimeout(() => resolve(this.num * 2), 5000); // (*)
    }
  };
  
  async function f() {
    // код будет ждать 1 секунду,
    // после чего значение result станет равным 2
    let result = await new Thenable(1);
    console.log(result);
  }
  
  f();