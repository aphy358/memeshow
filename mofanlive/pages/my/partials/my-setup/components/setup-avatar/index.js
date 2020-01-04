import { connectComponent } from "wx-redux"
import Action from '@/redux/action'
const Api = wx.X.Api

var COS = require('cos-wx-sdk-v5')
var cos = new COS({
  ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
  getAuthorization: async function (options, callback) {
    const res = await Api.userProfile.uploadFile('avatar')
    const { expiredTime, tmpSecretId, tmpSecretKey, token } = res

    callback({
      TmpSecretId: tmpSecretId,
      TmpSecretKey: tmpSecretKey,
      XCosSecurityToken: token,
      ExpiredTime: expiredTime,
    });
  }
});


const mapStateToProps = state => ({
  userProfile: state.userProfile
})
const mapDispatchToProps = dispatch => ({
  updateUserProfile(userProfile) {
    dispatch(Action.userProfile.update(userProfile))
  }
})

Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {

  },

  data: {
  },

  methods: {
    chooseImg(e) {
      let _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          var filePath = tempFilePaths[0];
          var filename = filePath.substr(filePath.lastIndexOf('/') + 1);

          cos.postObject({
            Bucket: 'mofanshow-avatar-1252461817',
            Region: 'ap-guangzhou',
            Key: filename,
            FilePath: tempFilePaths[0],
            onProgress: function (info) {
              console.log(JSON.stringify(info));
            }
          }, async function (err, data) {
            if (data) {
              if (data.Location.indexOf('http') === -1) {
                data.Location = 'https://' + data.Location
              }
              const res = await Api.userProfile.updateUserInfo({ avatar: data.Location })
              _this.updateUserProfile(res)
            } else {
              console.log(err);
            }
          });
        }
      })
    },
  },

  lifetimes: {
    ready() {
    },
    attached() {
    },
    detached() {
    }
  },
}))