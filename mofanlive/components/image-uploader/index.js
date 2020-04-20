import { chooseImage, uploadImage } from "@/utils/cos"
import _ from "lodash"

Component({
  properties: {
    // 初始化的图片
    // string[]
    initImages: {
      type: Array,
      value: []
    },

    // 最多上传数量
    maxlength: {
      type: Number,
      value: 5
    },

    // 单次上传的数量
    count: {
      type: Number,
      value: 1
    },

    // 标记
    tag: {
      type: Boolean,
      value: false
    },

    // 标记的字段
    tagText: {
      type: String,
      value: ""
    }
  },

  observers: {
    maxlength(number) {
      if (this.data.count > number) {
        this.setData({ count: number })
      }
    }
  },

  data: {
    // 新增的图片
    // object[]
    values: []
  },

  methods: {
    async add() {
      let { values, maxlength, initImages, count } = this.data

      // 当前的图片总数
      const currentImages = values.length + initImages.length
      if (currentImages > maxlength) return

      // 本次添加图片数量
      const nextCount =
        count <= maxlength - currentImages ? count : maxlength - currentImages

      try {
        const localPath = await chooseImage({ count: nextCount })
        if (Array.isArray(localPath)) {
          // 返回 Array，concat
          values = values.concat(
            localPath.map(str => ({
              tmpPath: str
            }))
          )
          this.setData({ values })
          this._uploader(localPath).then(finalPaths => {
            finalPaths.forEach(finalObj => {
              const image = values.find(val => val.tmpPath === finalObj.key)
              if (image) image.finalPath = finalObj.finalPath
            })
            this.setData({ values })
            this.emitChange()
          })
        } else {
          // 返回 string，push
          values.push({ tmpPath: localPath })
          this.setData({ values })
          uploadImage(localPath).then(url => {
            const image = values.find(val => val.tmpPath === localPath)
            if (image) image.finalPath = url
            this.setData({ values })
            this.emitChange()
          })
        }
      } catch (e) {
        console.error(`图片上传失败 ${e}`)
      }
    },

    delete(e) {
      const index = e.currentTarget.dataset.index
      this.data.values.splice(index, 1)
      this.setData({
        values: this.data.values
      })
      this.emitChange()
    },

    // todo: 合并逻辑
    deleteInit({ currentTarget }) {
      const index = currentTarget.dataset.index
      this.data.initImages.splice(index, 1)
      this.setData({
        initImages: this.data.initImages
      })
      this.emitChange()
    },

    emitChange() {
      const { values, initImages } = this.data
      let finalImages = values.map(n => n.finalPath)
      this.triggerEvent("change", [...initImages, ...finalImages])
    },

    // 批量上传
    _uploader(paths) {
      const tasks = paths.map(
        path =>
          new Promise((resolve, reject) => {
            uploadImage(path)
              .then(res => {
                resolve({
                  key: path,
                  finalPath: res
                })
              })
              .catch(err => {
                reject(err)
              })
          })
      )
      // todo 过滤失败的情况
      return Promise.all(tasks)
    }
  },

  options: {
    addGlobalClass: true
  }
})
