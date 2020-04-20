import "@/assets/images/loading.png"
import "@/assets/images/camera.png"
import "../../assets/front.png"
import "../../assets/reverse.png"
import "../../assets/in-hand.png"
import "../../assets/license.png"
import { chooseImage, uploadImage } from '@/utils/cos'
import _ from 'lodash'

Component({

  properties: {
    defaultImg: {
      type: String,
      value: ''
    }
  },

  data: {
    image: {},

    upLoading: false,
  },

  methods: {
    async add() {
      let { image } = this.data

      const filePath = await chooseImage()
      image.tmpPath = filePath
      this.setData({ image, upLoading: true })

      // 将临时文件路径上传
      const url = await uploadImage(filePath)
      image.finalPath = url
      this.setData({ image, upLoading: false })

      this.emitChange()
    },

    emitChange() {
      const { image } = this.data
      this.triggerEvent('change', image.finalImages)
    }
  },

  options: {
    addGlobalClass: true
  }
})
