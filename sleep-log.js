

/**
 * 2、实现一个包含sleep方法的类
 * 调用方式：(new LazyLog()).log(1).sleep(1000).log(2)
 * 输出：先输出1，延迟1秒后输出2
 */
class LazyLog {

  tasks = []

  running = false

  constructor() {

  }

  log(content) {
    this.tasks.push({ type: 'log', content })
    if(!this.running) this._run()
    return this
  }

  sleep(timeout) {
    this.tasks.push({ type: 'sleep', span: timeout })
    if(!this.running) this._run()
    return this
  }

  async _run() {
    this.running = true

    while (this.tasks.length) {
      const taskItem = this.tasks.shift()
      await this._runTask(taskItem)
    }
    this.running = false
  }

  async _runTask(task) {
    switch (task.type) {
      case 'log':
        console.log(task.content)
        break;
      case 'sleep':
        return new Promise((resolve) => setTimeout(() => {
          resolve()
        }, task.span))
    }
  }
}

(new LazyLog()).log(1).sleep(1000).log(2).sleep(3000).log(3)