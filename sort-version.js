// 示例用法
var versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
var sortedVersions = sortVersion(versions);
console.log(sortedVersions);


function sortVersion(versions) {
  return versions.sort((a, b) => {
    const arrA = a.split('.')
    const arrB = b.split('.')
    for (let i = 0; i < Math.max(arrA.length, arrB.length); i++) {
      if (arrA[i] > arrB[i]) {
        return true
      } else if (arrA < arrB[i]) {
        return false
      } else {
        return 0
      }
    }
  })

}