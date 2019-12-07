/**
 * 设置监听器
 */
export function setWatcher(page) {
  let data = page.data;
  let watch = page.watch;

  Object.keys(watch).forEach(v => {
    // 将watch中的属性以'.'切分成数组
    let key = v.split('.');
    // 将data赋值给nowData
    let nowData = data;
    // 遍历key数组的元素，除了最后一个！
    for (let i = 0; i < key.length - 1; i++) { 
      // 将nowData指向它的key属性对象
      nowData = nowData[key[i]]; 
    }
    let lastKey = key[key.length - 1];
    // 假设key==='my.name',此时nowData===data['my']===data.my,lastKey==='name'
    // 兼容带handler和不带handler的两种写法
    let watchFun = watch[v].handler || watch[v];
    // 若未设置deep,则为undefine
    let deep = watch[v].deep; 
    // 监听nowData对象的lastKey
    observe(nowData, lastKey, watchFun, deep, page); 
  })
}
/**
 * 监听属性 并执行监听函数
 */
function observe(obj, key, watchFun, deep, page) {
  var val = obj[key];
  // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
  if (deep && val != null && typeof val === 'object') {
    Object.keys(val).forEach(childKey => {
      observe(val, childKey, watchFun, deep, page);
    })
  }
  let that = this;
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function (value) {
      // value是新值，val是旧值
      watchFun.call(page, value, val); 
      val = value;
      // 若是深度监听,重新监听该对象，以便监听其属性。
      if (deep) { 
        observe(obj, key, watchFun, deep, page);
      }
    },
    get: function () {
      return val;
    }
  })
}
module.exports = {
  setWatcher: setWatcher
}