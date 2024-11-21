Array.prototype.myMap = function (fn) {
  const out = []

  for (let i = 0; i < this.length; i++) {
    out.push(fn(this[i], i, this))
  }
  return out
}

console.log([1, 2, 3].map(i => i * 2))
console.log([1, 2, 3].myMap(i => i * 3))


Array.prototype.myFilter = function (fn) {
  const out = []
  for (let [idx, i] of Object.entries(this)) {
    if (fn(i, idx, this)) {
      out.push(i)
    }
  }
  return out
}

console.log([1, 2, 3, 4].filter(i => i % 2 === 0))
console.log([1, 2, 3, 4].myFilter(i => i % 2 === 0))


Array.prototype.myReduce = function (fn, initial) {
  if (this.length <= 0) {
    return undefined
  }
  if (initial === undefined) {
    let out = this[0]
    for (let [idx, item] of Object.entries(this.slice(1))) {
      out = fn(out, item, idx, this)
    }
    return out
  }
  let out = initial
  for (let [idx, item] of Object.entries([...this])) {
    out = fn(out, item, idx, this)
  }

  return out
}

console.log([1, 2, 3].reduce((pre, next) => pre + next, 0))
console.log([1, 2, 3].myReduce((pre, next) => pre + next, 0))
console.log([1, 2, 3].myReduce((pre, next) => pre + next))