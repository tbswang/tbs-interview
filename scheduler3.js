class Scheduler {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.currentConcurrent = 0;
    this.queue = [];
  }

  // 将任务添加到队列
  async addTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.runNext();
    });
  }

  // 运行下一个任务
  runNext() {
    if (this.currentConcurrent >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.currentConcurrent++;
    const { task, resolve, reject } = this.queue.shift();

    task()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.currentConcurrent--;
        this.runNext();
      });
  }
}

// 使用示例
const scheduler = new Scheduler(2);

const task1 = () => new Promise((resolve) => setTimeout(() => {
  console.log('Task 1 completed');
  resolve();
}, 1000));

const task2 = () => new Promise((resolve) => setTimeout(() => {
  console.log('Task 2 completed');
  resolve();
}, 1000));

const task3 = () => new Promise((resolve) => setTimeout(() => {
  console.log('Task 3 completed');
  resolve();
}, 1000));

scheduler.addTask(task1);
scheduler.addTask(task2);
scheduler.addTask(task3);