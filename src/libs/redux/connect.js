import wrapActionCreators from './wrapActionCreators.js'
import { assign, warning, shallowEqual, setWatcher } from './util.js'

const defaultMapStateToProps = state => ({}) // eslint-disable-line no-unused-vars
const defaultMapDispatchToProps = dispatch => ({ dispatch })

function connect(mapStateToProps, mapDispatchToProps) {
  const shouldSubscribe = Boolean(mapStateToProps)
  const mapState = mapStateToProps || defaultMapStateToProps
  const app = getApp()

  let mapDispatch
  if (typeof mapDispatchToProps === 'function') {
    mapDispatch = mapDispatchToProps
  } else if (!mapDispatchToProps) {
    mapDispatch = defaultMapDispatchToProps
  } else {
    mapDispatch = wrapActionCreators(mapDispatchToProps)
  }

  // 这里的 pageConfig 不一定就是页面的配置属性，也可能是组件的配置属性，isComponent 为 true 则说明是在处理一个组件
  return function wrapWithConnect(pageConfig, isComponent) {
    const {
      onLoad: _onLoad,
      onUnload: _onUnload,
      attached: _attached,
      dettached: _dettached,
    } = pageConfig

    function handleChange(options) {
      if (!this.unsubscribe) {
        return
      }
      const state = this.store.getState()
      const mappedState = mapState(state, options);
      if (!this.data || shallowEqual(this.data, mappedState)) {
        return;
      }
      this.setData(mappedState)
    }

    function onLoad(options) {
      this.store = app.store;
      if (!this.store) {
        warning("Store对象不存在!")
      }
      if (shouldSubscribe) {
        this.unsubscribe = this.store.subscribe(handleChange.bind(this, options));
        handleChange.call(this, options)
      }
      if (this.watch){
        setWatcher(this)
      }
      isComponent
        ? typeof _attached === 'function' && _attached.call(this, options)
        : typeof _onLoad === 'function' && _onLoad.call(this, options)
    }

    function onUnload() {
      isComponent
        ? typeof _dettached === 'function' && _dettached.call(this)
        : typeof _onUnload === 'function' && _onUnload.call(this)

      typeof this.unsubscribe === 'function' && this.unsubscribe()
    }

    if(isComponent) return assign({}, pageConfig, mapDispatch(app.store.dispatch), { attached: onLoad, dettached: onUnload })
    return assign({}, pageConfig, mapDispatch(app.store.dispatch), { onLoad, onUnload })
  }
}
module.exports = connect
