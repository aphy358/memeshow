Component({
  properties: {
    dot: {
      type: Boolean,
      value: false
    },

    number: {
      type: Number,
      optionalTypes: [Number, String]
    },

    // 显示数字时的最大值
    max: {
      type: Number,
      value: 99
    },

    // 是否显示
    visibility: {
      type: Boolean,
      value: true,
    }
  },

  data: {
    value: ""
  },

  externalClassess: ["badge-class"],

  observers: {
    number(num) {
      const { max } = this.data
      if (typeof num === "string") num = Number(num)
      if (num > max) num = `${max}+`
      this.setData({ value: num })
    }
  },

  data: {},

  methods: {}
})
