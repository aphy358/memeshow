const toAngle = (a) => a / 180 * Math.PI
const percent = (a) => toAngle(a / 100 * 360)
const easeInOutCubic = (a, b, c, d) => {
  a /= d / 2
  if (a < 1) return c / 2 * a * a * a + b

  a -= 2
  let result = c / 2 * (a * a * a + 2) + b
  // console.log("result:", result)
  return result
}


Component({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  externalClasses: ['ws-class'],

  properties: {
    percent: { type: Number, value: 0, observer: 'redraw' },                //百分比
    size: { type: Number, value: 120, observer: 'updateStyle' },                 //进度环圆直径
    strokeWidth: { type: Number, value: 10 },        //进度环宽
    sAngle: { type: Number, value: 0, observer: 'setStartAngle' },              //进度环开始角度（默认3点钟方向）

    color: { type: String, value: '#FF2741' },          //进度条颜色
    backgroundColor: { type: String, value: '#333' },   //进度条背景颜色
    lineCap: { type: String, value: 'round' },       //进度环的线段末端样式，可选square|round|butt

    isClockwise: { type: Boolean, value: true },         //顺时针
    speed: { type: Number, value: 2000 },                //圈速
    animate: { type: Boolean, value: true },             //开启动画过度
    background: { type: Boolean, value: true },       //是否显示进度环的轨迹背景
    activeMode: { type: String, value: 'backwards' }	     //backwards从头播放|forwards从上次结束点播放
  },

  data: {
    beginAngle: 0,
    startAngle: 0,
    endAngle: 0,
    currentAngle: 0,
    circleImgPath: ''
  },

  created() {
    this.nextCallback = null
  },

  attached() {
    this.updateStyle()
    if (this.data.percent === 0) {
      this.draw(false)
    }
  },

  detached() {
    this.ctx = null
    this.cancelNextCallback()
    this.clearTimer()
  },

  methods: {
    // 更新角度
    setStartAngle(newVal) {
      // console.log(newVal)
      this.setData({
        beginAngle: toAngle(newVal),
      })
    },

    // 更新样式
    updateStyle(size = this.data.size) {
      const style = `width: ${size}px; height: ${size}px;`
      this.setData({
        style,
      })
    },

    /**
     * 着帧绘制 canvas
     */
    redraw(value = this.data.percent) {
      const endAngle = percent(value)
      // console.log(value, endAngle)
      const now = Date.now()
      const decrease = this.data.currentAngle > endAngle//判断是增加还是减少
      const startAngle = !decrease ? this.data.currentAngle : this.data.endAngle

      // this.cancelNextCallback()
      this.clearTimer()

      this.safeSetData({ startAngle, endAngle }, () => {
        this.animate(now, now, decrease)
      })
    },

    /**
     * 绘制 canvas
     */
    draw(line = true) {
      const { lineCap, backgroundColor, color, size, strokeWidth, isClockwise, background } = this.data
      const position = size / 2
      const radius = position - strokeWidth / 2
      const p = 2 * Math.PI

      const startAngle = !isClockwise ? p - this.data.beginAngle : this.data.beginAngle
      const endAngle = !isClockwise ? p - (this.data.beginAngle + this.data.currentAngle) : this.data.beginAngle + this.data.currentAngle

      // 创建 canvas 绘图上下文
      this.ctx = this.ctx || wx.createCanvasContext('circle', this)

      // 清除画布
      this.ctx.clearRect(0, 0, size, size)

      // 绘制背景
      if (background) {
        this.ctx.beginPath()
        this.ctx.arc(position, position, radius, 0, 2 * Math.PI)
        this.ctx.setLineWidth(strokeWidth)
        this.ctx.setStrokeStyle(backgroundColor)
        this.ctx.stroke()
      }

      // 绘制进度
      if (line) {
        this.ctx.beginPath()
        this.ctx.arc(position, position, radius, startAngle, endAngle)
        this.ctx.setLineWidth(strokeWidth)
        this.ctx.setStrokeStyle(color)
        this.ctx.setLineCap(lineCap)
        this.ctx.stroke()
      }

      // 绘制完成
      this.ctx.draw(false, () => {
        this.triggerEvent('change', { value: this.data.currentAngle })
      })
    },

    /**
     * 开始动画
     */
    animate(c, d, decrease) {
      const now = Date.now()
      const f = now - c < 1 ? 1 : now - c
      const { animate, speed, startAngle, endAngle } = this.data

      if (!decrease && 1000 * this.data.currentAngle <= Math.floor(1000 * endAngle)) {
        var isEnd = true
      } else if (decrease && 1000 * this.data.currentAngle >= Math.floor(1000 * endAngle)) {
        var isEnd = true
      }

      if (animate && c - d < 1.05 * speed && isEnd) {
        const value = easeInOutCubic(
          (c - d) / f,
          startAngle,
          endAngle - startAngle,
          speed / f
        )

        // console.log(c, d, decrease, f, startAngle, endAngle)
        const currentAngle = value < 0 ? 0 : value

        c = Date.now()

        this.safeSetData({ currentAngle }, () => {
          this.draw(currentAngle !== 0)
          this.timer = setTimeout(() => this.animate(c, d, decrease), 1000 / 60)
        })
      } else {
        this.safeSetData({ currentAngle: endAngle }, () => this.draw(endAngle !== 0))
      }
    },

    /**
     * 清除定时器
     */
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },

    /**
     * safeSetData
     * @param {Object} nextData 数据对象
     * @param {Function} callback 回调函数
     */
    safeSetData(nextData, callback) {
      callback = this.setNextCallback(callback)

      this.setData(nextData, () => {
        callback()
      })
    },

    /**
     * 设置下一回调函数
     * @param {Function} callback 回调函数
     */
    setNextCallback(callback) {
      let active = true

      this.nextCallback = (event) => {
        if (active) {
          active = false
          this.nextCallback = null

          callback.call(this, event)
        }
      }

      this.nextCallback.cancel = () => {
        active = false
      }

      return this.nextCallback
    },

    /**
     * 取消下一回调函数
     */
    cancelNextCallback() {
      if (this.nextCallback !== null) {
        // console.log(this)
        // this.nextCallback.cancel()
        this.nextCallback = null
      }
    },
  }
})
