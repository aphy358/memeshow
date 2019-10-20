import { addUnit } from '../../common/utils';
import { animateTo } from '../../../components/common/utils'

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
    // 是否正在加载
    isLoading: {
      type: Boolean,
      value: false,
      observer(newVal) {
        console.log('isLoading: ', newVal);
        if(newVal){
          setInterval(() => {
            let loadingAnimation = animateTo({ 'width': '0%' }, 0)
            this.setData({ loadingAnimation })

            loadingAnimation = animateTo({ 'width': '100%' }, 400)
            this.setData({ loadingAnimation })
          }, 450);
        }else{

        }
      }
    },
  },

  data: {
    strokeWidthUnit: '8rpx',

    loadingAnimation: null,
  },

  methods: {
    setStrokeWidthUnit(val) {
      this.setData({
        strokeWidthUnit: addUnit(val)
      });
    }
  }
})
