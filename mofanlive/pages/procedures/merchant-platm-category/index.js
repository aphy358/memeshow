const procedures = wx.X.procedures

Page({
  data: {
    categories: [],

    // 递归的层级
    deepth: 1,

    // 选取的路径
    path: []
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onUnLoad() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit("complete")
    }
  },

  async onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)
    this.data.instance = instance
    instance
      .asProcedure()
      .on("init", ({ categories, deepth = 1, path = [] }) => {
        this.setData({
          categories,
          deepth,
          path
        })
      })
  },

  // 选择一个分类
  onClickCategory({ currentTarget }) {
    const index = currentTarget.dataset.index
    if (typeof index === "undefined") return

    const categroy = this.data.categories[Number(index)]
    this.data.path.push({ id: categroy.id, name: categroy.name })

    if (categroy.children && categroy.children.length > 0) {
      // 有子分类，递归
      const instance = procedures.open("merchant-platm-category")
      instance.asCaller().emit("init", {
        categories: categroy.children,
        deepth: this.data.deepth + 1,
        path: this.data.path
      })

      // 递归抛出数据
      instance.asCaller().on("choose", ({ categories, deepth }) => {
        this.data.instance.asProcedure().emit("choose", { categories, deepth })
      })
    } else {
      // 无 children，完成
      this.data.instance.asProcedure().emit("choose", {
        categories: this.data.path,
        deepth: this.data.deepth
      })
    }
  }
})
