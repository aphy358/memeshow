
/**
 * 初始化全局的弹层数据，用于统一管理弹层的 z-index（包括 popup、toast 等等）
 * 初始状态下，当页面没有任何弹出层的时候，我们把 _global.mofanshow.popupCount 设置为0，_global.mofanshow.popupZIndex 设置为9000
 * 每当显示一个弹层的时候，popupCount + 1，popupZIndex + 1（这个叠加之后的 popupZIndex 将被设置为这个弹层的 z-index 属性值）
 * 每当隐藏一个弹层的时候，popupCount - 1，减完之后如果 popupCount === 0，则将 popupZIndex 重新设置为9000
 */
const getGlobalInitZIndex = () => {
  let _global = typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined' ? global : {}

  _global.mofanshow = _global.mofanshow || {}
  _global.mofanshow.popupCount = _global.mofanshow.popupCount || 0
  _global.mofanshow.popupZIndex = _global.mofanshow.popupZIndex || 9000

  let bValue = 0
  Object.defineProperty(_global.mofanshow, 'popupCount', {
    get: function(){
      return bValue;
    },
    set: function(newValue){
      if(newValue === 0){
        this.popupZIndex = 9000
      }

      bValue = newValue;
    },
    enumerable : true,
    configurable : true
  })

  return _global
}

const GLOBAL = getGlobalInitZIndex()


module.exports = {
  getGlobalInitZIndex,
  GLOBAL
}
