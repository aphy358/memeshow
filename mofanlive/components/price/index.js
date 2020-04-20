Component({
  properties: {
    price: {
      type: Number,
      value: 0,
    },
    title: {
      type: String,
      value: "",
    },
    color: {
      type: String,
      value: "#eeeeee"
    },
    size: {
      type: Number,
      value: 32,
    }
  },

  data: {
    integer: "",
    decimal: "",
  },

  observers: {
    price(num) {
      let decimal = num % 100
      if (decimal < 10) {
        decimal = "0" + decimal
      } else {
        decimal = decimal.toString()
      }
      this.setData({
        integer: Math.floor(num / 100).toString(),
        decimal,
      })
    },
  },

  options: {
    addGlobalClass: true
  }
})