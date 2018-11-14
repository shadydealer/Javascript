function compose() {
  let funcs = Object.keys(arguments).map((key) => {return arguments[key]});

  return function(val) {
    funcs.forEach((f) => {
      val = (f(val));
    });
    return val;
  }
}

const identity = function(x) {return x};
const square = function(x) {return x*x};
const cubed = function(x) {return x*x*x};

let composition = compose(identity, square, cubed);
console.log(composition(2)); //64
console.log(composition(3)); //729