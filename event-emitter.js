/**
 * 10、补齐EventEmitter
 */

class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, handler: (event) => void) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(handler)
  }

  once(eventName, handle) {
    const onceHandle = (...args)=>{
      handle(...args)
      this.off(eventName, handle)
    }
    this.events[eventName].push(onceHandle)
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return
    }
    this.events[eventName].forEach(handle => {
      handle(...args)
    });
  }

  off(eventName, handle) {
    if (!handle) {
      this.events[eventName] = null
    }
    this.events[eventName] = this.events[eventName].filter(h => h !== handle)

  }

  filter(eventName): EventEmitter {
    
  }
}


// 创建 EventEmitter 实例
const emitter = new EventEmitter();

// 注册事件处理函数
emitter.on('eventName', (data) => {
  console.log('Event triggered with data:', data);
});

// 触发事件
emitter.emit('eventName', { key: 'value' });
// 输出: Event triggered with data: { key: 'value' }

// 注册一次性事件处理函数
emitter.once('onceEvent', (data) => {
  console.log('This will only run once:', data);
});

// 触发一次性事件
emitter.emit('onceEvent', { key: 'one' });
// 输出: This will only run once: { key: 'one' }

// 再次触发一次性事件，不会有输出
emitter.emit('onceEvent', { key: 'two' });
// 不会有输出

// 使用 filter 方法
const filteredEmitter = emitter.filter('filteredEvent');

filteredEmitter.on('filteredEvent', (data) => {
  console.log('Filtered event received:', data);
});

// 触发过滤的事件
emitter.emit('filteredEvent', { key: 'filtered' });
// 输出: Filtered event received: { key: 'filtered' }
