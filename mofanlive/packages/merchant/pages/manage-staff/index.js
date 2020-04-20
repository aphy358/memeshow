import { connectPage } from "wx-redux"
import Action from "@/redux/action"

const router = wx.X.router

const mapStateToProps = state => {
  const e = state.sellerProfile.employee
  const type = (!!e.wechat || !e.wxworkKfId) ? 1 : 2
  return {
    name: e.name, // 员工名
    avatar: e.avatar,  // 头像
    id: e.id,  
    role: e.position, // 职称
    sn: e.sn,  // 工号
    wechatCode: type == 1? e.wechatQrCode : e.wxworkQrCode, // 微信二维码
    type, // 联系方式类型 [个人， 企业]
    wechat: type == 1 ? e.wechat : e.wxworkKfId, // 微信号
    department: e.department, // 部门
  }
}
const mapDispatchToProps = dispatch => ({
  updateEmployeeInfo(employee) {
    dispatch(Action.sellerProfile.updateEmployee(employee))
  }
})

Page(connectPage(mapStateToProps, mapDispatchToProps)({
  data: {
    name: "",        // 员工名
    avatar: "",      // 头像
    role: "",        // 角色
    wechat: "",      // 微信号
    wechatCode: "",  // 微信二维码
    type: 1,         // 类型 个人或企业
  },

  delete() {
    wx.showModal({
      title: "删除后客户将无法直接加您微信，确定删除吗？",
      success: async (res) => {
        if (res.confirm) {
          const employee = await wx.X.Api.UserProfile.updateEmployee({
            avatar: "",
            department: "",
            id: 0,
            name: "",
            position: "",
            wxworkKfId: "",
            wxworkQrCode: "",
            sn: "",
            wechat: "",
            wechatQrCode: ""
          })
          this.updateEmployeeInfo(employee)
        }
        if (res.cancel) {
        }
      }
    })
  },

  edit() { router.go("editStaff") },

  options: {
    addGlobalClass: true
  }
}))