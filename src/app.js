import WeAppRedux from './plugins/redux/index.js';
import createStore from './plugins/redux/createStore.js';
import reducer from './plugins/redux/store/reducer.js';

import ENVIRONMENT_CONFIG from './plugins/redux/config/envConfig.js'

const { Provider } = WeAppRedux;
const store = createStore(reducer)

const api = require('./utils/api.js')


App(
  Provider(store)(
    {
      globalData: {
        emitter: null,
        netcallController: null,
        ENVIRONMENT_CONFIG,


        isLogin: true, //前端测试，默认用户已经登录
        userInfo: null,
        share: false,  // 分享默认为false
        statusBarHeight: 0,
        titleBarHeight: 0,
        W: 0,
        H: 0,
        presetData: null,
        delArticle: [],
        articlePrivacy: [],
        user_qrcode: [],
        hasClipboardData: !0,
        overTime: 4000,
        AppStatus: false,
        AppFlag: false
      },

      onShow: function (e) {
        if (e.scene == 1007 || e.scene == 1008) {
          try {
            this.globalData.netcall && this.globalData.netcall.destroy()
            this.globalData.nim && this.globalData.nim.destroy({
              done: function () {
              }
            })
          } catch (e) {
          }
        }
      },

      onLaunch: function (options) {
        // IM 相关
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
          this.globalData.userInfo = userInfo
        }
        let systemInfo = wx.getSystemInfoSync()
        this.globalData.videoContainerSize = {
          width: systemInfo.windowWidth,
          height: systemInfo.windowHeight
        }
        this.globalData.isPushBeCallPage = false



        wx.setTabBarStyle({
          color: '#9f9f9f',
          selectedColor: '#3b3b3b',
          borderStyle: 'white'
        })

        var that = this;
        // 判断是否由分享进入小程序
        if (options.scene == 1007 || options.scene == 1008) {
          this.globalData.share = true
        } else {
          this.globalData.share = false
        };
        //分别获取
        wx.getSystemInfo({
          success: function (res) {
            console.log(res)
            that.globalData.platform = res.platform
            let totalTopHeight = 68
            if (res.model.indexOf('iPhone X') !== -1) {
              totalTopHeight = 88;
              that.globalData.isIphoneX = true;
            } else if (res.model.indexOf('iPhone') !== -1) {
              totalTopHeight = 64
            }
            that.globalData.model = res.model
            that.globalData.platform = res.platform
            that.globalData.totalTopHeight = totalTopHeight
            that.globalData.statusBarHeight = res.statusBarHeight
            that.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
            that.globalData.W = res.screenWidth
            that.globalData.H = res.screenHeight
          },
          failure() {
            that.globalData.statusBarHeight = 0
            that.globalData.titleBarHeight = 0
          }
        })
        
        api.login(function (loginRes) {
          console.log('登录完成: ', loginRes)

          that.globalData.isLogin = true;
          if (that.onLogin) {
            that.onLogin();
          }

          if(loginRes.roleType != 'guest'){
            api.getUserInfo(function (userInfo) {
              console.log('获取到用户信息: ')
              that.globalData.userInfo = userInfo;
              if (that.onUserInfo) {
                that.onUserInfo(userInfo);
              }
            })
          }
        })
      }
    }
  )
)