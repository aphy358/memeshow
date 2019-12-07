
let oldConsole =  console;

console = {
  log:function(...args){
    App.debug == true && oldConsole && oldConsole.log && oldConsole.log(...args)
  },
  error: oldConsole.error,
  group: oldConsole.group,
  warn: oldConsole.warn,
  groupEnd: oldConsole.groupEnd
}

function injectPage(config){
    const oldPage = Page //保存原来的Page
    // 重写方法
    Page.onLoad = function () {
      var currentPage = getCurrentPages()[getCurrentPages().length - 1];;
      var pageName = currentPage.route;
      console.log(currentPage, pageName)
      // 调用页面方法，修改this的指向
      oldPage.onLoad.call(this, arguments);
    }
    Page.onShow = function () {
      // 曝光, PV开始
      console.log('evt_show', pageName);
      console.log('evt_pvBegin', pageName);
      // 调用页面方法，修改this的指向
      oldPage.onShow.call(this, arguments);
    }
    Page.onHide = function () {
      // PV结束
      console.log('evt_pvEnd', pageName);
      oldPage.onHide.call(this, arguments);
    }
    // return oldPage(config)
}



var oldApp = App
App = function (args){
  args.onLaunch = injective(args.onLaunch,injectPage)
  args.onShow = injective(args.onShow, track)
  args.onHide = injective(args.onHide, track, track)
  args.onError = injective(args.onError, track, track)
  args.onPageNotFound = injective(args.onPageNotFound, customLaunch, track)
  oldApp(args)
}


function customLaunch(opt) {
  track({ type: "自定义事件", name: 'customLaunch', data: opt }) // 日志上报
}

function track(opt) {
  // let err = new Error(opt)
  console.log("自动埋点日志", opt)
}

function before(arg) {
  console.log("before")
}
function after(arg) {
  console.log("after")
}

function injective(func, before, after) {
  return function () {
    var args = [].slice.call(arguments);
    before && before.apply(this, args);
    var ret = func && func.apply(this, args);
    after && after.apply(this, [ret].concat(args));
    return ret;
  }
}



var page = {
  init: function () {
    // 获取当前页面对象
    var currentPage = getCurrentPages()[getCurrentPages().length - 1];;
    var pageName = currentPage.route;
    // 重写生命周期方法
    currentPage.onShow && !function () {
      var b = currentPage.onShow;
      // 重写方法
      currentPage.onShow = function () {
        // 曝光, PV开始
        STAT.Event.stat('evt_show', pageName);
        STAT.Event.stat('evt_pvBegin', pageName);
        // 调用页面方法，修改this的指向
        b.call(this, arguments);
      }
    }();
    currentPage.onHide && !function () {
      var b = currentPage.onHide;
      currentPage.onHide = function () {
        // PV结束
        STAT.Event.stat('evt_pvEnd', pageName);
        b.call(this, arguments);
      }
    }();
  }
}

// // 页面引入SDK文件

// var STAT = require('../utils/stat.js');

// 在onLoad方法中进行init

// onLoad: function (options) {

//   STAT.Page.init();

// }
