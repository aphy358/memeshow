import computedBehavior from 'miniprogram-computed'
import { safeArea } from 'ui-kit/behaviors/safeArea'
const _ = require('lodash')

Component({
  behaviors: [safeArea(), computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    // select sheet是否展示
    open: {
      type: Boolean,
      value: false
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
    }
  },
  computed: {
    displayProps() {
      const result = _.cloneDeep(this.data.props)
      const selectedProp = this.data.selectedProp

      // 遍历每个属性项
      for (let i = 0; i < result.length; i++) {
        // 该属性项是否有选中的属性值
        const index = selectedProp.findIndex(it => it.kid === result[i].kid)
        for (let j = 0; j < result[i].values.length; j++) {
          // 判断该属性值是否已选，从selectedProp中查找 找到则选中
          result[i].values[j].isSelected = (index === -1 ? false : result[i].values[j].vid === selectedProp[index].vid)

          // 过滤出与该属相项和属性值相关的skus
          let relatedSkus = _.filter(this.data.skus, sku => _.findIndex(sku.specs, it => it.vid === result[i].values[j].vid) != -1)
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

      return result
    },
    image() {
      // 若没有选择sku 或者没有sku图片 则返回item头像
      if (this.data.selectedProp.length < 1 || this.data.images.length < 1) {
        return this.data.avatar
      }
      let index = 0,
        flag = -1
      for (; index < this.data.selectedProp.length; index++) {
        flag = _.findIndex(this.data.images, o => {
          return (o.kid == this.data.selectedProp[index].kid && o.vid == this.data.selectedProp[index].vid)
        })
        if (flag != -1) {
          break;
        }
      }
      return index === this.data.selectedProp.length ? this.data.avatar : this.data.images[flag].thumbnail
    },
    price() {
      if (this.data.id != '') {
        const index = _.findIndex(this.data.skus, o => {
          return o.id == this.data.id
        })
        return this.data.skus[index].price
      }
      return 0;
    },
    skuSelected() {
      let str = ''
      const len = this.data.selectedProp.length
      if (len === 0) return str

      this.data.props.forEach(item => {
        const index = _.findIndex(this.data.selectedProp, o => {
          return o.kid == item.kid
        })
        if (index != -1) {
          const vid = _.findIndex(item.values, o => {
            return o.vid == this.data.selectedProp[index].vid
          })
          str += item.values[vid].v + ' '
        }
      })
      return str
    }
  },
  data: {
    selectedProp: [],
    props: [],
    id: '',
    quantity: 1
  },
  observers: {
    'skus': function (skus) {
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
        props
      })
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
        id: selectionId
      })
    },
    'selectionQuantity': function (quantity) {
      if (quantity < 1) return;
      this.setData({
        quantity
      })
    }
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
      (index === -1) ? addProp(selectedProp, kid, vid) : modifyProp(selectedProp, index, kid, vid)

      if (selectedProp.length === this.data.props.length) {
        updateSkuId(this.data)
      } else {
        this.data.id = ""
      }
      this.setData({
        selectedProp
      })
      this.emitSelectEvent()

      function addProp(selectedProp, kid, vid) {
        selectedProp.push({
          kid: kid,
          vid: vid
        })
      }

      function modifyProp(selectedProp, index, kid, vid) {
        selectedProp[index].vid == vid ? selectedProp.splice(index, 1) : selectedProp.splice(index, 1, {
          kid: kid,
          vid: vid
        })
      }

      function updateSkuId(data) {
        const selectedProp = data.selectedProp
        var skus = data.skus
        selectedProp.forEach(prop => {
          skus = _.filter(skus, sku => {
            return (_.findIndex(sku.specs, spec => spec.vid == prop.vid) != -1)
          })
        })
        data.id = skus[0].id
      }
    },

    changeQuantity({
      detail
    }) {
      this.setData({
        quantity: detail
      })
    },

    emitSelectEvent() {
      this.triggerEvent('selectedSku', {
        sku: (this.data.selectedProp.length < this.data.props.length ? null : _.find(this.data.skus, ['id', this.data.id])),
        quantity: this.data.quantity
      })
    },

    emitCancel() {
      this.triggerEvent('cancel')
    }
  }
})
