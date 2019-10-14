import { addUnit } from '../../common/utils';

Component({
  externalClasses: ['custom-class'],

  properties: {
    inactive: Boolean,
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    showPivot: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: '#1989fa'
    },
    textColor: {
      type: String,
      value: '#fff'
    },
    strokeWidth: {
      type: String | Number,
      observer: 'setStrokeWidthUnit'
    },
    // 用户自定义动画
    customAnimation: {
      type: Object,
      value: null
    },
  },

  data: {
    strokeWidthUnit: '8rpx'
  },

  methods: {
    setStrokeWidthUnit(val) {
      this.setData({
        strokeWidthUnit: addUnit(val)
      });
    }
  }
})
