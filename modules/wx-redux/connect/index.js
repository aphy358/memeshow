import {
  assign,
  shallowEqual,
  warning,
  wrapActionCreators,
  at,
  set
} from "../utils"

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })

function createConnect(mapConfig) {
  function connect(mapStateToProps, mapDispatchToProps) {
    const shouldSubscribe = Boolean(mapStateToProps)
    const mapState = mapStateToProps || defaultMapStateToProps

    // get Weapp Global Data
    const app = getApp()

    let mapDispatch
    if (typeof mapDispatchToProps === "function") {
      mapDispatch = mapDispatchToProps
    } else if (!mapDispatchToProps) {
      mapDispatch = defaultMapDispatchToProps
    } else {
      mapDispatch = wrapActionCreators(mapDispatchToProps)
    }

    return function wrapWithConnect(config) {
      const _onLoad = at(config, mapConfig.load)
      const _onUnload = at(config, mapConfig.unload)
      const _onShow = at(config, mapConfig.show)
      const _onHide = at(config, mapConfig.hide)

      // 触发 change 事件, 更新 mapped state
      function handleChange() {
        if (!this.unsubscribe) return
        if (!this.data) return
        const state = this.store.getState()
        const mappedState = mapState(state)
        if (this.activeState) {
          // 激活，直接更新
          if (!shallowEqual(this.data, mappedState)) {
            // _setData.call(this, mappedState)
            this.setData(mappedState)
          }
        } else {
          // 未激活，先缓存状态，等激活后一次性更新
          if (
            !this.delayedState ||
            !shallowEqual(this.delayedState, mappedState)
          ) {
            this.delayedState = mappedState
          }
        }
      }

      // 同步更新 this.data; 异步更新 webview ?? todo 为什么没出现 setData 异步的问题?
      function _setData(data) {
        this.data = assign(this.data, data)
        this.setData(data)
      }

      function active() {
        this.activeState = true
        if (!this.data) return
        if (this.delayedState && !shallowEqual(this.data, this.delayedState)) {
          this.setData(this.delayedState)
          // _setData.call(this, this.delayedState)
          this.delayedState = null
        }
      }

      function deactive() {
        this.activeState = false
        this.delayedState = null
      }

      // 从Store中拉取数据，注册监听
      function mount() {
        if (!this.store) !!app.store ? (this.store = app.store) : warning("Store 对象未定义")
        if (!mapConfig.onShow) active.call(this)
        // subscribe mapstate
        if (shouldSubscribe) {
          this.unsubscribe = this.store.subscribe(handleChange.bind(this))
          handleChange.call(this)
        }
      }

      // 注销监听
      function unmount() {
        typeof this.unsubscribe === "function" && this.unsubscribe()
      }

      // 替换生命周期
      function onLoad() {
        mount.call(this)
        if (typeof _onLoad === "function") {
          _onLoad.call(this, ...arguments)
        }
      }

      function onUnload() {
        if (typeof _onUnload === "function") {
          _onUnload.call(this, ...arguments)
        }
        unmount.call(this)
      }

      function onShow() {
        active.call(this)
        if (typeof _onShow === "function") {
          _onShow.call(this, ...arguments)
        }
      }

      function onHide() {
        if (typeof _onHide === "function") {
          _onHide.call(this, ...arguments)
        }
        deactive.call(this)
      }

      const lifetimes = {}
      set(lifetimes, onLoad, mapConfig.load)
      set(lifetimes, onShow, mapConfig.show)
      set(lifetimes, onHide, mapConfig.hide)
      set(lifetimes, onUnload, mapConfig.unload)

      const dispatches = mapDispatch(app.store.dispatch)
      let methods
      if (mapConfig.methods) {
        methods = {}
        set(
          methods,
          assign({}, at(config, mapConfig.methods) || {}, dispatches),
          mapConfig.methods
        )
      } else {
        methods = dispatches
      }
      return assign({}, config, methods, lifetimes)
    }
  }
  return connect
}

export const connectPage = createConnect({
  load: "onLoad",
  unload: "onUnload",
  show: "onShow",
  hide: "onHide",
  methods: ""
})
export const connectComponent = createConnect({
  load: "lifetimes.attached",
  unload: "lifetimes.detached",
  show: "pageLifetimes.show",
  hide: "pageLifetimes.hide",
  methods: "methods"
})
export const connectBehavior = createConnect({
  load: "attached",
  unload: "detached",
  show: "",
  hide: "",
  methods: "methods"
})
