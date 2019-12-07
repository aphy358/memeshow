const ajax = require('./ajax.js');
let DEBUC = true //切换数据入口， true为模拟数据 , false 为后台接口数据
const Mock = require('./mock-min.js/index.js'); //引入mock

// 登录
function login(success) {
  wx.login({
    success: function (res) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      ajax.request({
        method: 'POST',
        url: '/auth/login/mapp',
        data: {code: res.code},
        success: loginRes => {
          // console.log('app登录成功: ', loginRes)
          wx.setStorageSync('token', loginRes.data.token);
          //登录获取token 继续注册登录
          if (success) {
            success(loginRes);
          }
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
  // console.log("updateUserInfo...")
  ajax.request({
    method: 'POST',
    url: 'user/updateUserInfo',
    data: userInfo,
    success: success
  })
}

// 获取第一个应用
function getRecommendList(opt) {
  if(!DEBUC) {
    ajax.request({
      method: 'GET',
      url: '/video/recommendList',
      data: opt.data || {
        page: 1,
        size: 10
      },
      success: opt.success
    })
  }else {
    return opt.success(Mock.mock({
      count: 100,
      page: opt.page,
      'content|10': [{
        id: "@id()",
        desc: "@cparagraph(2)",
        videoUrl: 'https://cloudbrain-docs.oss-cn-shenzhen.aliyuncs.com/b59f4b87980968cf301ce381192a0401-1542820599684.mp4',
        likes: "@integer(100, 10000)",
        comments: "@integer(100, 1000)",
        commentId: "@guid()", //打开评论，call到评论的数据
        follow: "@boolean()",
        shares: "@integer(100, 10000)",
        publisher: {
          avatar: "@image('200x200', '#4A7BF7', '#fff', 'pic')",
          name: "@ctitle(2,11)",
          location: "@city()"
        },
        product: {
          type: "@integer(1, 2)",
          title: "@ctitle(3,8)",
          desc: "@cparagraph(2)",
          image: "@image('200*200')",
          price: "@float(100, 1000, 1, 2)",
          discountPrice: "@float(60, 600, 1, 2)",
          beginTime: "@integer(0, 5)"
        }

      }]
    }))
  }
  return opt.success({
    data: {
      count: 80,
      page: opt.data.page, //模拟，暂时由有传入的page决定
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
  // console.log("applySubject...")
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
        // console.log('发布成功')
        opt.success(res.data);
      }
    }
  })
}

function applyVideoSubject(opt) {
  // console.log("applySubject...")
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
  // console.log('loadTalks: ', opt)
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