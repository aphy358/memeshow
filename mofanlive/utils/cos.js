// 文件上传 SDK
const COS = require("cos-wx-sdk-v5")
const Api = wx.X.Api

import Config from "config"

/**
 * 初始化 COS 实例，SDK 参考 https://cloud.tencent.com/document/product/436/31953
 */
const cos = new COS({
  ForcePathStyle: true, // 如果使用了很多存储桶，可以通过打开后缀式，减少配置白名单域名数量，请求时会用地域域名
  getAuthorization: async function(options, callback) {
    try {
      const {
        expiredTime,
        tmpSecretId,
        tmpSecretKey,
        token
      } = await Api.UserProfile.uploadFile("avatar")

      callback({
        TmpSecretId: tmpSecretId,
        TmpSecretKey: tmpSecretKey,
        XCosSecurityToken: token,
        ExpiredTime: expiredTime
      })
    } catch (e) {
      console.error(`获取COS临时签名失败：${e}`)
    }
  }
})

/**
 * 选择图片
 *
 * @param {object} options - 微信选择图片的配置参数，参考 https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.chooseImage.html
 */
export function chooseImage(
  options = {
    count: 1,
    sizeType: ["compressed"],
    sourceType: ["album", "camera"]
  }
) {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      ...options,
      success(res) {
        resolve(
          res.tempFilePaths.length > 1
            ? res.tempFilePaths
            : res.tempFilePaths[0]
        )
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 上传图片
 *
 * @param {string} path
 * @param {function} listener - onProgress
 */
export function uploadImage(path, listener) {
  if (!path || typeof path !== "string") {
    return Promise.reject(new Error("参数错误"))
  }

  return new Promise((resolve, reject) => {
    // 指定上传的文件名
    var key = path.substr(path.lastIndexOf("/") + 1)

    cos.postObject(
      {
        Key: key,
        FilePath: path,
        Bucket: Config.cos.bucket,
        Region: Config.cos.region,
        onProgress: function(info) {
          listener && listener(info)
        }
      },
      (err, data) => {
        if (data) {
          if (data.Location.indexOf("http") === -1) {
            data.Location = "https://" + data.Location
          }
          resolve(data.Location)
        } else {
          reject(err)
        }
      }
    )
  })
}

export default cos
