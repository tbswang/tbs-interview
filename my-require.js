const fs = require('fs')
const path = require('path')

function myRequire(filePath){
    const absolutePath = path.resolve(__dirname, filePath)
    const moduleCode = fs.readFileSync(absolutePath, 'utf-8')

    const module = { exports: {}}
    const wrapCode = `(function(module, exports){${moduleCode}})(module, module.exports)`
    eval(wrapCode)
    return module.exports
}

const funcA = myRequire('./module-a.js')
funcA()
const moduleB = myRequire('./module-b.js')
console.log(moduleB.cc)