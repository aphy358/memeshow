const api = require('utils/api.js');
//app.js
App({
  
  globalData: {
    userInfo: null
  },

  onLaunch: function (options) {
    console.log('app onLaunch')
    console.log(options)
    var that = this;
    
    console.log('准备登录')
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
})