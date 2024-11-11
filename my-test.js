/**
 * 技术要点：
 * 1. 在 expect 函数中，通过 throw 抛出错误
 * 2. 在 it 和 describe 中组装错误信息
 * 3. todo 如何确定 it 和 expect函数是在 describe 中运行呢？
 */

function describe(testSuiteName, func) {
  // start 
  console.log(`beginning test suite ${testSuiteName}`)
  // test
  try {
    func()
    console.log(`successfully completed test suite ${testSuiteName}`)
  } catch (error) {
    // 测试失败
    console.log(`failed running test suite ${testSuiteName} on  ${error.message}`)
  }
  // final
}
function it(testCaseName, func) {
  try {
    console.log(`beginning test case ${testCaseName}`)
    func()
    console.log(`successfully completed test case ${testCaseName}`)
  } catch (error) {
    throw new Error(`test case ${testCaseName} with error message ${error.message}`)
  }

}
function expect(actual) {
  return {
    toExist() {
      if (actual !== null && actual !== undefined)
        return true
      throw new Error(`expected value to exist but got ${actual}`)
    },
    toBe(expected) {
      if (actual === expected) {
        return true
      }
      throw new Error(`expected ${actual} to be ${expected}`)
    },
    toBeType(typeString) {
      const typeOfActual = typeof actual
      if (typeOfActual === typeString) {
        return true
      }
      throw new Error(`expected ${actual} to be of type ${type} but got ${typeOfActual}`)
    }
  }
}


// use case
describe('Passing Test Suite', () => {
  it('Passing Test Case #1', () => {
    expect('foo').toExist();
    expect(1 + 1).toBe(2);
  });

  it('Passing Test Case #2', () => {
    expect({}).toBeType('object');
  });
});

describe('Failing Test Suite', () => {
  it('Passing Test Case', () => {
    expect(0).toBe(0);
  });

  it('Failing Test Case', () => {
    expect(true).toBe(true);
    expect(true).toBe(false);
  });

  it('Unreachable Test Case', () => {
    expect('foo').toBe('bar');
  });
});