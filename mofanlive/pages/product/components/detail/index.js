Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: String,
      value: '',
    }
  },

  data: {
    nodes: ""
  },

  observers: {
    'data': function (data) {
      if (!data) return;
      this.setData({
        nodes: data.replace(/\<img/gi, '<img class="rich-img" ')
      })
    }
  }
})
