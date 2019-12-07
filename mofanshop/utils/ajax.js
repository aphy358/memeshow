//var serverPath = 'http://localhost:10002';
var serverPath = 'http://localhost:8080';
// var serverPath = 'https://100boot.cn/douyin/';


const key = '23012a763d494e8e914347b8d1551317';

// common.js
function request(opt) {
  // set token
  var token = wx.getStorageSync("token");
  if (token && opt.url.indexOf('token=') == -1) {
    if (opt.url.indexOf('?') == -1) {
      opt.url += "?token=" + token;
    } else {
      opt.url += "&token=" + token;
    }
  }
  if (key && opt.url.indexOf('key=') == -1) {
    if (opt.url.indexOf('?') == -1) {
      opt.url += "?key=" + key;
    } else {
      opt.url += "&key=" + key;
    }
  }
  wx.showNavigationBarLoading();
  console.log('t: ', encodeURIComponent(token))

  const jwt_token = wx.getStorageSync('jwt_token')
  console.log('jwt_token: ', jwt_token)
  wx.request({
    method: opt.method || 'GET',
    header: {
      Cookie: 'cloudmall_sessId=' + encodeURIComponent(token),
      Authorization: 'Bearer ' + jwt_token
    },
    url: serverPath + opt.url,
    data: opt.data,
    success: function (res) {
      console.log('res: ', res)
      if (res.statusCode == 200) {
        if(res.data.code == 0){
          if (opt.success) {
            opt.success(res.data);
          }
        }else{
          console.warn(res.data);
          wx.showModal({
            content: res.data.message,
            showCancel: false
          })
        }
      } else {
        console.error(res);
        wx.showModal({
          title: '微信异常',
          content: res.statusCode,
          showCancel: false
        })
      }
    },
    fail: function(){
      // wx.showModal({
      //   content: '远程连接失败',
      //   showCancel: false
      // })
    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  })
}

module.exports = {
  serverPath: serverPath,
  request : request,
  key: key
}