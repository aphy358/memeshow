const Api = wx.X.Api
const procedures = wx.X.procedures

Page({
  data: {
    showCategoryEditor: false,
    categories: [],
    checked: [],

    categoryModal: {
      show: false,
      title: "",
      value: "",

      update: false,
      updateId: ""
    }
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onUnLoad() {
    const instance = procedures.get(this.data.sid)
    if (instance) instance.asProcedure().emit("complete")
  },

  async onReady() {
    await this.fetchCategories()
    this.data.instance = procedures.get(this.data.sid)
    this.data.instance.register(this)
    this.data.instance.asProcedure().on("init", checked => {
      if (!checked.length) return
      const categories = this.data.categories
      const mappedChecked = []
      if (categories.length) {
        checked.forEach(checkedItem => {
          const target = categories.find(category => category.id == checkedItem)
          if (target) {
            mappedChecked.push({ ...target })
            target.checked = true
          }
        })
      }
      this.setData({ checked: mappedChecked, categories })
    })
  },

  // 获取分类列表
  async fetchCategories() {
    const categories = await Api.MerchantCategory.shopCategories()
    this.data.categories = this._mapChecked(categories)
    this.setData({ categories: this.data.categories })
  },

  // 选择或取消选择
  onChange({ currentTarget }) {
    if (!currentTarget.dataset.id) return
    const { ischecked, id } = currentTarget.dataset
    const { checked, categories } = this.data
    const categoriesIndex = categories.findIndex(category => category.id == id)

    if (ischecked) {
      // 取消选择
      const checkedIndex = checked.findIndex(
        checkedItem => checkedItem.id == id
      )
      if (checkedIndex >= 0) checked.splice(checkedIndex, 1)
      if (categoriesIndex >= 0) delete categories[categoriesIndex].checked
    } else {
      // 选择
      if (categoriesIndex >= 0) {
        checked.push({ ...categories[categoriesIndex] })
        categories[categoriesIndex].checked = true
      }
    }
    this.setData({ checked, categories })
  },

  // 确认选择
  onConfirm() {
    const { checked } = this.data
    this.data.instance.asProcedure().emit("choose", checked)
    wx.navigateBack()
  },

  // 置顶
  async onSetTop({ currentTarget }) {
    const index = currentTarget.dataset.index
    if (!index) return
    const targetCategory = this.data.categories[Number(index)]
    const prevCategory = this.data.categories[Number(index) - 1]

    await Api.MerchantCategory.updateShopCategory({
      id: targetCategory.id,
      name: targetCategory.name,
      sort: prevCategory.sort
    })

    await Api.MerchantCategory.updateShopCategory({
      id: prevCategory.id,
      name: prevCategory.name,
      sort: targetCategory.sort
    })

    this.fetchCategories()
  },

  // 编辑
  onEdit({ currentTarget }) {
    const { index } = currentTarget.dataset
    if (typeof index === "undefined") return
    const category = this.data.categories[index]
    if (category) {
      this.setData({
        categoryModal: {
          show: true,
          title: "编辑分类",
          value: category.name,
          update: true,
          updateId: category.id
        }
      })
    }
  },

  // 删除
  async onDelete({ currentTarget }) {
    const index = currentTarget.dataset.index
    if (typeof index === 'undefinded') return
    const category = this.data.categories[Number(index)]
    if (!category) return
    const response = await wx.showModalAsync({
      title: "确定删除该分类?",
      content: "分类下商品不会被删除",
    })

    if(response.confirm) {
      await Api.MerchantCategory.deleteShopCategory(category.id)
      this.fetchCategories()
    }
  },

  // 添加分类
  onAdd() {
    this.setData({
      categoryModal: {
        show: true,
        title: "添加分类"
      }
    })
  },

  // 输入分类名称
  onChangeCategoryModal({ detail }) {
    const value = detail.value
    this.data.categoryModal.value = value
  },

  // 确认弹窗
  async onConfirmCategoryModal() {
    const categoryModal = this.data.categoryModal

    if (categoryModal.value) {
      if (!categoryModal.update) {
        // 新增
        await Api.MerchantCategory.createShopCategory({
          name: categoryModal.value
        })
      } else {
        // 更新
        await Api.MerchantCategory.updateShopCategory({
          id: categoryModal.updateId,
          name: categoryModal.value
        })
      }

      this.onCloseCategoryModal()
      this.fetchCategories()
    }
  },

  // 取消弹窗操作
  onCancelCategoryModal() {
    this.onCloseCategoryModal()
  },

  // 关闭弹窗
  onCloseCategoryModal() {
    this.setData({
      categoryModal: {
        show: false,
        title: "",
        value: "",
        update: false,
        updateId: ""
      }
    })
  },

  /**
   * 把 list 中的 category 和 checked 匹配
   *
   * @param {*} list
   */

  _mapChecked(list) {
    const checked = this.data.checked
    const mappedChecked = []
    checked.forEach(checkItem => {
      const target = list.find(item => item.id == checkItem.id)
      if (target) {
        mappedChecked.push({ ...target })
        target.checked = true
      }
    })
    this.data.checked = mappedChecked
    this.setData({
      checked: this.data.checked
    })
    return list
  }
})
