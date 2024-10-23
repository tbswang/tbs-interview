/**
 * JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善代码中Scheduler类，
 */
class Scheduler {
  taskQueue = []
  runningTask = 0
  constructor(taskQueue = [], runningTask = 0) {
    this.taskQueue = taskQueue;
    this.runningTask = runningTask
  }
  add(task) {
    this.taskQueue.push(task)
  }

  run() {
    if(this.runningTask >= 2) return
    const curTask = this.taskQueue.shift()
    this.runningTask++
    if(!curTask) return
    curTask().finally(() => {
      this.runningTask--
      this.run()
    })
    this.run()
  }
}

// 示例代码
const scheduler = new Scheduler();

const addTask = (time, order) => {
  return () => new Promise(resolve => {
    setTimeout(() => {
      console.log(order);
      resolve();
    }, time);
  });
};

scheduler.add(addTask(1000, 1));
scheduler.add(addTask(1000, 2));
scheduler.add(addTask(1000, 3));
scheduler.add(addTask(1000, 4));
scheduler.add(addTask(1000, 5));
scheduler.run()