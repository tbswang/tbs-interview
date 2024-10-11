
function currying(fn) {
  return function inner(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    else {
      return function (...args2) {
        return inner.apply(this, args.concat(args2))
      }
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

console.log(currying(sum)(1)(2)(3))