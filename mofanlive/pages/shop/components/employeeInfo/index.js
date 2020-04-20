import { connectComponent } from "wx-redux"

Component(
  connectComponent(
    state => ({
      context: state.context
    }),
    dispatch => ({})
  )({
    properties: {
      // 员工基本信息
      employee: Object,

      // 员工标签
      tagImg: {
        type: String,
        value: ""
      },

      // Card 的 Path
      shareImg: {
        type: String,
        value: "https://wwj-products.mofanbaby.com/6387ab92d7cb4d3e801361ffd5fc512e.jpeg"
      }
    },

    data: {
      employeeTag: "./../../assets/employeetag.png"
    },

    methods: {
      click: function() {
        this.triggerEvent("click")
      },

      completemessage() {
        this.triggerEvent("completemessage")
      },

      move: function() {}
    }
  })
)
