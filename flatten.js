function flatten(val) {
  if (typeof val !== 'object' || val === null)
    return val

  if (Array.isArray(val)) {
    return flattenArray(val)
  }
  return flattenObj(val)
}
function flattenArray(arr) {
  let out = []
  for (let item of arr) {
    if (typeof item !== 'object' || item === null) {
      out = out.concat(item)
    } else if (Array.isArray(item)) {
      out = out.concat(flattenArray(item))
    } else {
      out = out.concat(flattenObj(item))
    }
  }
  return out
}

function flattenObj(obj) {
  const out = {}
  for (let [key, val] of Object.entries(obj)) {
    if (typeof val !== 'object' || val === null) {
      out[key] = val
    } else if (Array.isArray(val)) {
      out[key] = flattenArray(val)
    } else {
      Object.assign(out, flattenObj(val))
    }
  }
  return out
}

const in1 = [1, 2, [3, { d: { dd: '4' } }]]
console.log(flatten(in1))