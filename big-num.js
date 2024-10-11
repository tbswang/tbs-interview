/**
 * 3、大数字符串相加
 * 输入：num1 = '1234567890', num2 = '987654321'
 * 输出：'2222222211'
 */

function add(num1, num2) {
  const num1List = num1.split('').reverse()
  const num2List = num2.split('').reverse()

  let idx1 = 0
  let idx2 = 0
  let flag = 0
  const res = []
  while (idx1 < num1List.length && idx2 < num2List.length) {
    const tmp = Number(num1List[idx1]) + Number(num2List[idx2]) + flag
    if (tmp > 9) {
      flag = 1
      res.push(tmp - 10,)
    } else {
      flag = 0
      res.push(tmp)
    }
    idx1++
    idx2++
  }
  while (idx1 < num1List.length) {
    res[idx1] = Number(num1List[idx1]) + flag
    flag = 0
    idx1++
  }
  while (idx2 < num2List.length) {
    res[idx2] = Number(num2List[idx2]) + flag
    flag = 0
    idx2++
  }

  return res.reverse().join('')
}

var num1 = '1234567890', num2 = '987654321'
console.log(add(num1, num2))