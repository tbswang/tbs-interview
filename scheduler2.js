class Scheduler {
    constructor() {
        this.tasks = [];
        this.runningTasks = 0;
    }

    add(promiseCreator) {
        return new Promise((resolve, reject) => {
            this.tasks.push(() => 
                promiseCreator().then(resolve).catch(reject).finally(() => {
                    this.runningTasks--;
                    this.next();
                })
            );
            this.next();
        });
    }

    next() {
        if (this.runningTasks < 2 && this.tasks.length) {
            const task = this.tasks.shift();
            this.runningTasks++;
            task();
        }
    }
}

// 示例代码
const scheduler = new Scheduler();

const addTask = (time, order) => {
    return () => new Promise(resolve => {
        setTimeout(() => {
            console.log(new Date().getSeconds(), order);
            resolve();
        }, time);
    });
};

scheduler.add(addTask(1000, 1));
scheduler.add(addTask(1000, 2));
scheduler.add(addTask(1000, 3));
scheduler.add(addTask(1000, 4));
scheduler.add(addTask(1000, 5));
