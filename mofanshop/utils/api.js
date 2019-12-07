const ajax = require('ajax.js');

// 登录
function login(success) {
  console.log("login...")
  wx.login({
    success: function (res) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log('微信登录成功, code: ', res.code)

      ajax.request({
        method: 'POST',
        url: '/user/passport/wxlite',
        data: {code: res.code},
        success: loginRes => {
          console.log('app登录成功: ', loginRes)
          wx.setStorageSync('token', loginRes.data.token);
          wx.setStorageSync('openid', loginRes.data.openid);
          wx.setStorageSync('session_key', loginRes.data.session_key);
          wx.setStorageSync('jwt_token', loginRes.data.jwt_token);

          console.log('返回 jwt_token: ' + loginRes.data.jwt_token)

          if (success) {
            success(loginRes);
          }

          // test
          ajax.request({
            method: 'GET',
            url: '/user/user/33',
            data: { code: res.code },
            success: r => {
              console.log('测试结果: ', r)
            }
          })
        }
      })
    }
  })
}

// 获取用户信息
function getUserInfo(success) {
  success({})

  /*
  console.log("getUserInfo...")
  ajax.request({
    method: 'GET',
    url: 'user/getUserInfo',
    success: success
  })
  */
}

// 更新用户信息
function updateUserInfo(userInfo, success) {
  console.log("updateUserInfo...")
  ajax.request({
    method: 'POST',
    url: 'user/updateUserInfo',
    data: userInfo,
    success: success
  })
}

// 获取第一个应用
function getRecommendList(opt) {
  console.log("getRecommendList...")
  return opt.success({
    data: {
      count: 100,
      pages: 10,
       content: [
         {
           coverUrl: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96',
            title: '杨幂假唱爱的供养',
            type: 'video',
           avaterUrl: 'http://wx.qlogo.cn/mmhead/ver_1/ZGUEsHq3NgPXs2YVpv7M57RYM1yWv8iaRzJP3NDNicMoKVue4m0XozfNf3ib4wMMQVvQGqCuuMUuibPTXuibDmCB5nJdtN36hVWBD1Z8TWokUCwc/96',
           like: true,
           likes: 198,
           talks: 339,
           shares: 677
          }
       ]
    }
  })
  ajax.request({
    method: 'GET',
    url: '/video/recommendList',
    data: opt.data || {
      page: 1,
      size: 10
    },
    success: opt.success
  })
}

// 发表一个说说
function applySubject(opt) {
  console.log("applySubject...")
  wx.showNavigationBarLoading();
  var token = wx.getStorageSync("token");
  wx.uploadFile({
    url: ajax.serverPath + 'subject/apply?key=' + ajax.key + '&token=' + token,
    filePath: opt.filePath,
    name: 'file',
    formData: opt.formData || {},
    success: function (res) {
      wx.hideNavigationBarLoading();
      if (opt.success) {
        console.log('发布成功')
        opt.success(res.data);
      }
    }
  })
}

function applyVideoSubject(opt) {
  console.log("applySubject...")
  wx.showNavigationBarLoading();
  var token = wx.getStorageSync("token");
  wx.uploadFile({
    url: ajax.serverPath + 'subject/applyVideo?key=' + ajax.key + '&token=' + token,
    filePath: opt.filePath,
    name: 'file',
    formData: opt.formData || {},
    success: function (res) {
      wx.hideNavigationBarLoading();
      if (opt.success) {
        opt.success(res.data);
      }
    }
  })
}

function like(data, success){
  ajax.request({
    url: 'subject/like',
    data: data,
    success: success
  })
}

function loadTalks(opt){
  console.log('loadTalks: ', opt)
  /*
  ajax.request({
    url: 'subject/talks',
    data: opt.data,
    success: opt.success
  })
  */
}

function applyTalk(opt){
  ajax.request({
    method: 'POST',
    url: 'subject/talk',
    data: opt.data,
    success: opt.success
  })
}

module.exports = {
  login: login,
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  applySubject: applySubject,
  applyVideoSubject: applyVideoSubject,
  getRecommendList: getRecommendList,
  like: like,
  loadTalks: loadTalks,
  applyTalk: applyTalk
}