function deepClone(val) {
  // 原始类型，直接返回
  if (typeof val !== 'object' || val === null)
    return val
  if (Array.isArray(val)) {
    return val.map(deepClone)
  }
  const out = {}
  for (let key in val) {
    if (Object.prototype.hasOwnProperty.call(val, key)) {
      out[key] = deepClone(val[key])
    }
  }
  return out
}

const input = { a: { aa: 1 } }
console.log(deepClone(input))