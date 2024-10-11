import dayjs from 'dayjs'
class LightController {

  red = { color: 'red', span: 1000 }
  green = { color: 'green', span: 2000 }
  yellow = { color: 'yellow', span: 3000 }

  order = [this.red, this.green, this.yellow]

  /**
   * 开始执行
   */
  async start() {
    while (this.order.length) {
      const thisLight = this.order.shift()
      await this._run(thisLight)
      this.order.push(thisLight)
    }
  }
  stop() {

  }

  /**
   * 单次执行
   */
  _run(light) {
    return new Promise((resolve) => {
      console.log(light.color, dayjs().format('hh:mm:ss'))
      setTimeout(() => {
        resolve(light.color)
      }, light.span);
    })
  }

  next() {

  }
}

new LightController().start()