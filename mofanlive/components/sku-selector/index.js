import { safeArea } from 'ui-kit/behaviors/index'
import { connectComponent } from "wx-redux"
import _ from 'lodash'

Component(connectComponent(
  state => ({
    neigou: state.neigou,
    stockWaringThreshold: state.systemConfig.stockWaringThreshold,
  })
)({
  behaviors: [safeArea()],
  /**
   * 组件的属性列表
   */
  properties: {
    // select sheet是否展示
    open: {
      type: Boolean,
      value: false,
    },
    // sku的图片
    images: {
      type: Array,
      value: []
    },
    // skus
    skus: {
      type: Array,
      value: []
    },
    // 已选的skuId
    selectionId: {
      type: String,
      value: ''
    },
    // 已选的数量
    selectionQuantity: {
      type: Number,
      value: 0
    },
    // 商品的头图
    avatar: {
      type: String,
      value: ''
    },
    // 商品的标题
    title: {
      type: String,
      value: ''
    },
    // 是否内购
    isNeigou: {
      type: Boolean,
      value: true
    }
  },
  data: {
    selectedProp: [],
    props: [],
    quantity: 1,
    displayProps: [],
    image: "",
    price: "",
    selectedSpecs: "",
    selectedSku: null,
    restNeigou: 0,
  },
  observers: {
    'skus': function (skus) {
      // 若只有一个sku则默认选中并抛出
      if (skus.length === 1) {
        this.setData({ selectedSku: skus[0] }, () => {
          this.emitSelectEvent()
        })
      }

      // 过滤重复的specs
      const specs = _.uniqBy(_.flatMap(skus, it => it.specs), 'vid')

      // 先过滤重复的kid
      const props = _.uniqBy(_.map(specs, it => ({
        kid: it.kid,
        k: it.k
      })), 'kid')

      // 往过滤后的map添加v列表
      const kidValues = _.mapValues(_.groupBy(specs, 'kid'), it => _.map(it, it2 => _.pick(it2, 'vid', 'v')))
      props.forEach(it => {
        it.values = kidValues[it.kid]
      })

      this.setData({
        props,
      })
      if (!!props) {
        this.updateDisplay()
      }
    },
    'selectionId': function (selectionId) {
      // 若为空 则不做操作
      if (_.isEmpty(selectionId)) return;
      // 查找该sku
      const index = _.findIndex(this.data.skus, o => o.id === selectionId)
      if (index === -1) {
        console.error('找不到对应的sku')
        return;
      }
      this.setData({
        // 将该sku的specs插入到已选中的selectedSpecs中 表示该sku的specs为选中状态
        selectedProp: _.map(this.data.skus[index].specs, it => _.pick(it, ['kid', 'vid'])),
        id: selectionId,
        selectedSku: this.data.skus[index],
      })
    },
    'selectionQuantity': function (quantity) {
      if (quantity < 1) return;
      this.setData({
        quantity
      })
    },
    'open': function (open) {
      if (open) this.updateDisplay()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancel() {
      this.triggerEvent('cancel')
    },

    onTapVal(e) {
      if (e.target.dataset.disabled) return;
      const t = e.target.id.split('|')
      const kid = t[0]
      const vid = t[1]
      const selectedProp = this.data.selectedProp
      const index = _.findIndex(selectedProp, o => {
        return o.kid == kid
      });

      if (index === -1) {
        // 属性值未选择
        selectedProp.push({
          kid: kid,
          vid: vid
        })
      } else {
        // 已选则更新
        selectedProp[index].vid == vid ? selectedProp.splice(index, 1) : selectedProp.splice(index, 1, {
          kid: kid,
          vid: vid
        })
      }

      // 选中一个sku
      let skus = this.data.skus
      let selectedSku = null
      if (selectedProp.length === this.data.props.length) {
        selectedProp.forEach(prop => {
          skus = _.filter(skus, sku => {
            return (_.findIndex(sku.specs, spec => spec.vid == prop.vid) != -1)
          })
        })
        selectedSku = skus[0]
      }
      this.setData({
        selectedProp,
        selectedSku: selectedSku,
      }, () => {
        this.emitSelectEvent()
        this.updateDisplay()
      })
    },

    changeQuantity({ detail }) {
      const quantity = detail.value != NaN ? detail.value : 1
      this.setData({
        quantity
      }, () => {
        this.emitSelectEvent()
      })
    },

    emitSelectEvent() {
      if (!this.data.selectedSku) return
      this.triggerEvent('change', {
        sku: (this.data.selectedProp.length < this.data.props.length ? null : this.data.selectedSku),
        quantity: this.data.quantity
      })
    },

    emitCancel() {
      this.triggerEvent('cancel')
    },

    updateDisplay() {
      const data = this.data
      this.updateDisplayProps(data)
      this.updateDisplayImage(data)
      this.updateDisplayPrice(data)
      this.updateDisplaySpecs(data)
    },

    updateDisplayProps(data) {
      const props = data.props
      const selectedProp = data.selectedProp
      const result = props || {}

      // 遍历每个属性项
      for (let i = 0; i < result.length; i++) {
        // 该属性项是否有选中的属性值
        const index = selectedProp.findIndex(it => it.kid == result[i].kid)
        for (let j = 0; j < result[i].values.length; j++) {
          // 判断该属性值是否已选，从selectedProp中查找 找到则选中
          result[i].values[j].isSelected = (index === -1 ? false : result[i].values[j].vid == selectedProp[index].vid)

          // 过滤出与该属相项和属性值相关的skus
          let relatedSkus = _.filter(data.skus, sku => _.findIndex(sku.specs, it => it.vid === result[i].values[j].vid) != -1)
          // 其他属性项中已选的属性值
          const otherSelectedProps = _.filter(selectedProp, it => it.kid != result[i].kid)
          // 若没有选择其他属性项则为相关skus库存总和
          if (!_.isEmpty(otherSelectedProps)) {
            otherSelectedProps.forEach(it => {
              relatedSkus = _.filter(relatedSkus, sku => _.reduce(sku.specs, (res, next) => res || _.isMatch(next, it), false))
            })
          }
          result[i].values[j].isSoldOut = _.sumBy(relatedSkus, it => it.stock) < 1
        }
      }

      this.setData({
        displayProps: result
      })
    },

    updateDisplayImage(data) {
      if (!data) return

      let image = ""
      // 若没有选择sku 或者没有sku图片 则返回item头像
      if (data.selectedProp.length < 1 || data.images.length < 1) {
        image = data.avatar
      } else {
        let index = 0
        let flag = -1
        for (; index < data.selectedProp.length; index++) {
          flag = _.findIndex(data.images, o => {
            return (o.kid == data.selectedProp[index].kid && o.vid == data.selectedProp[index].vid)
          })
          if (flag != -1) {
            break;
          }
        }
        image = index === data.selectedProp.length ? data.avatar : data.images[flag].thumbnail
      }
      this.setData({
        image
      })
    },

    updateDisplayPrice(data) {
      if (!data) return
      let result = "￥0"
      const sku = data.selectedSku
      const isNeigou = data.isNeigou
      console.log(isNeigou, sku)
      if (!!sku) {
        if (isNeigou && !!sku.neigou) {
          result = "￥" + (sku.neigou.price / 100).toFixed(2)
        } else {
          result = "￥" + (sku.price / 100).toFixed(2)
        }
      } else {
        let min = 999999999999999
        let max = 0
        _.forEach(data.skus, sku => {
          const price = isNeigou && !!sku.neigou ? sku.neigou.price : sku.price
          if (min > price) min = price
          if (max < price) max = price
        })
        if (min) {
          result = `￥${(min / 100).toFixed(2)}起`
        }
      }
      this.setData({
        price: result
      })
    },

    updateDisplaySpecs(data) {
      if (!data) return
      let str = ''

      // 没有规格
      if (data.skus.length <= 1) return

      if (!data.selectedSku) {
        str += '请选择：'
        _.forEach(data.displayProps, it => {
          str += `${it.k }`
        })
      } else {
        str += '已选：'
        _.forEach(data.selectedSku.specs, it => {
          str += `${it.v }`
        })
      }

      this.setData({
        selectedSpecs: str
      })
    },

    async attached() {
      const restNeigou = await wx.X.Api.InternalBuy.balance()
      this.setData({
        restNeigou: restNeigou.count
      })
    }
  },
  options: {
    addGlobalClass: true
  }
}))