import { connectPage } from "wx-redux"
import { safeArea } from 'ui-kit/behaviors/safeArea'
import { chooseImage, uploadImage } from '@/utils/cos'
import Action from "@/redux/action"
import _ from 'lodash'

const mapStateToProps = state => {
  const e = state.sellerProfile.employee
  const type = (!!e.wechat || !e.wxworkKfId) ? 1 : 2
  return {
    name: e.name, // 员工名
    avatar: e.avatar,  // 头像
    id: e.id,
    role: e.position, // 职称
    sn: e.sn,  // 工号
    wechatCode: type == 1 ? e.wechatQrCode : e.wxworkQrCode, // 微信二维码
    type, // 联系方式类型 [个人， 企业]
    wechat: type == 1 ? e.wechat : e.wxworkKfId, // 微信号
    department: e.department, // 部门
    personalWechat: e.wechat,
    personalWechatQRCode: e.wechatQrCode,
    wxworkKfId: e.wxworkKfId,
    wxworkQrCode: e.wxworkQrCode,
  }
}
const mapDispatchToProps = dispatch => ({
  updateEmployeeInfo(employee) {
    dispatch(Action.sellerProfile.updateEmployee(employee))
  }
})

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  behaviors: [safeArea()],
  data: {
    name: "",        // 员工名
    avatar: "",      // 头像
    role: "",        // 角色
    wechat: "",      // 微信号
    wechatCode: "",  // 微信二维码
    type: 1,         // 类型 个人或企业
    id: "",
    sn: "",          // 工号
    department: "",  // 部门
  },

  changeWechatType(e) {
    if (e.detail.value != this.data.type) {
      const { personalWechat, wxworkKfId, personalWechatQRCode, wxworkQrCode } = this.data
      this.setData({
        type: e.detail.value,
        wechat: e.detail.value == 1 ? personalWechat : wxworkKfId,
        wechatCode: e.detail.value == 1 ? personalWechatQRCode : wxworkQrCode,
      })
    } else {
      this.setData({
        type: this.data.type
      })
    }
  },

  changeName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  changeRole(e) {
    this.setData({
      role: e.detail.value
    })
  },

  changeSn(e) {
    this.setData({
      sn: e.detail.value
    })
  },

  changeDepartment(e) {
    this.setData({
      department: e.detail.value
    })
  },

  changeWechat(e) {
    let { personalWechat, wxworkKfId, type } = this.data
    type == 1 ? personalWechat = e.detail.value : wxworkKfId = e.detail.value
    this.setData({
      wechat: e.detail.value,
      personalWechat,
      wxworkKfId,
    })
  },

  async changeImage(e) {
    const field = e.currentTarget.dataset.field
    const filePath = await chooseImage({
      sizeType: ["original"],
    })
    const basicUrl = await uploadImage(filePath)
    const imgSize = "?imageView2/1/w/200/h/200"
    const url = basicUrl + imgSize
    this.setData({
      [field]: url
    })

    if (field == 'wechatCode') {
      let { personalWechatQRCode, wxworkQrCode, type } = this.data
      type == 1 ? personalWechatQRCode = url : wxworkQrCode = url
      this.setData({ personalWechatQRCode, wxworkQrCode })
    }
  },

  async update() {
    wx.showLoading()
    const { 
      avatar,
      name,
      role,
      sn,
      department,
      wxworkKfId,
      wxworkQrCode,
      personalWechat,
      personalWechatQRCode,
    } = this.data
    const employee = await wx.X.Api.UserProfile.updateEmployee({
      avatar: avatar,
      name: name,
      position: role,
      sn,
      department,
      wxworkKfId,
      wxworkQrCode,
      wechat: personalWechat,
      wechatQrCode: personalWechatQRCode,
    })
    this.updateEmployeeInfo(employee)
    wx.hideLoading()
    wx.showToast({
      title: "更新成功"
    })
    setTimeout(() => {
      wx.navigateBack({ delta: 1 })
    }, 500)
  },

  options: {
    addGlobalClass: true
  }
}))