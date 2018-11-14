function curry(func) {
  
  let argCount = func.length;
  let allArgs = [];
  
  return function inner() {

    let args = Object.keys(arguments).map((key) => {return arguments[key]});

    argCount -= args.length;
    
    allArgs.push(...args);

    if(argCount == 0)
    {
      let result = func.apply(undefined, allArgs);
      argCount = func.length;
      allArgs = [];
      
      return result;
    }

    return inner;
  };
}


let trippleAdd = (a, b, c) => {return a + b + c};
let curriedTA = curry(trippleAdd);
console.log(curriedTA(1, 2)(3));
console.log(curriedTA(1)(2)(3));
console.log(curriedTA(1,2,3));
console.log(curriedTA(1)()()()(2,3));
