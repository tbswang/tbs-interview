// 示例用法
// var sortedVersions = sortVersion(versions);
// console.log(sortedVersions);

// var versions = [];
const versions = ["1.0.0", "1.2", "1.1.1", "1.1", "1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];

function sortVersion(versions) {
  return versions.sort((a, b) => {
    const arrA = a.split('.').map(Number)
    const arrB = b.split('.').map(Number)
    for (let i = 0; i < Math.max(arrA.length, arrB.length); i++) {
      const numA = arrA[i] || 0; // 默认值 0
      const numB = arrB[i] || 0; // 默认值 0
      if (numA > numB) {
        return 1
      } else if (numA < numB) {
        return -1
      }
    }
    return 0
  })
}

function sortVersion2(versionList) {
  return versionList.sort((verA, verB) => {
    const verAList = verA.split('.')
    const verBList = verB.split('.')
    while (verAList.length > 0 && verBList.length > 0) {
      if (verAList[0] > verBList[0]) {
        return 1
      } else if (verAList[0] < verBList[0]) {
        return -1
      } else {
        verAList.shift()
        verBList.shift()
      }
    }
    return 0
  })
}

console.log(sortVersion(versions));
// console.log(sortVersion2(versions));
