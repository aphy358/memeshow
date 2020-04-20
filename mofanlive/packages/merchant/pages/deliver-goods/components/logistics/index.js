import { connectComponent } from "wx-redux"

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => ({})


Component(connectComponent(mapStateToProps, mapDispatchToProps)({
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },

  properties: {
    order: {
      type: Object,
      value: {}
    },
    needLogistics: {
      type: Boolean,
      value: true
    },
  },

  data: {
    // 关闭订单原因
    logisticsCompany: {
      selected: '',
      value: -1,
      range: [
        "顺丰",
        "百世",
        "申通",
        "中通",
        "圆通",
        "韵达",
        "邮政",
        "EMS",
        "天天",
        "京东",
        "优速",
        "德邦",
        "宅急送"
      ],
    },
  },

  methods: {
    /**
     * 选择快递公司
     */
    handleExpressChange({ detail }) {
      const selected = this.data.logisticsCompany.range[detail.value]
      this.setData({
        "logisticsCompany.selected": selected,
        "logisticsCompany.value": Number(detail.value) + 1,
      })
      this.triggerEvent('expressChange', selected)
    },

    switchExpressNecessary({ currentTarget: { dataset } }) {
      this.triggerEvent('switchExpressNecessary', dataset.necessary)
    },

    inputExpressNo({ detail }) {
      this.triggerEvent('inputExpressNo', detail.value)
    },
  },

  lifetimes: {
    attached: function () {
    },

    detached: function () {
    },
  },
}))