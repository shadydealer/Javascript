function memoize(func){
  
  let cache = {};
  
  return function (){
    
    let key = JSON.stringify(arguments);
    let result = cache[key];
    
    if(!result)
    {
      console.log("calculating...");
      result = func.apply(undefined, arguments);
      cache[key] = result;
    }
    return result;
  };
}


let sum = (a, b) => {return a  + b};
let memoizedSum = memoize(sum);


console.log(memoizedSum(3,3));
console.log(memoizedSum(3,3));
console.log(memoizedSum(2,3));
