import procedures from '@/pages/procedures/index'

import _ from 'lodash'

Page({
  data: {
    article: {
      title: "",

      /**
       * [
       *   {
       *     id: string,
       *     sort: integer,
       *     y: integer,
       *     height: integer,
       *     type: string ['base']
       *   }
       * ]
       */
      nodes: [
        {
          id: 'node1',
          sort: 1,
          y: 0,
          height: 0,
          type: 'base',
        },
      ],
      idDataMap: {
        'node1': {
          text: "this is node1",
          pic: '../../../../../assets/images/image-icon.png'
        }
      },

      activeNodeY: 0,
      activeNodeIndex: -1,
      top: 0,
      height: 0,
      scrollOffset: 0,
      draging: false,
      touchOffset: 0,
    },

    titleHeight: 0,
    canScroll: true,
    sid: '',

    popoverRect: { top: 0, left: 0, right: 0, bottom: 0 },
    popoverVisible: false,
    currentSort: -1,
  },

  onLoad(options) {
    this.data.sid = options.sid
  },

  onReady() {
    const instance = procedures.get(this.data.sid)
    instance.register(this)

    this.initTopPlaceHolder()
    this.initArticleTop()
  },

  onShow() {
    this.updateNodes()
  },

  onUnload() {
    const instance = procedures.get(this.data.sid)
    if (instance) {
      instance.asProcedure().emit('complete')
    }
  },

  /**
   * 初始化标题 fixed 的占位
   */
  initTopPlaceHolder() {
    wx.createSelectorQuery().selectAll(".title").boundingClientRect().exec(res => {
      this.setData({
        titleHeight: Math.floor((_.maxBy(res[0], it => it.height)).height)
      })
    })
  },

  /**
   * 初始化文章编辑区域上边界高度
   */
  initArticleTop() {
    wx.createSelectorQuery().selectAll(".article-area").boundingClientRect().exec(res => {
      this.setData({
        "article.top": Math.floor((_.minBy(res[0], it => it.top)).top)
      })
    })
  },

  /**
   * 更新文章编辑区域高度
   */
  updateNodes() {
    wx.createSelectorQuery().selectAll(".node").boundingClientRect().exec(res => {
      const orderedNodes = _.orderBy(this.data.article.nodes, 'sort')
      const height = _.reduce(res[0], (result, it, index) => {
        orderedNodes[index].y = result
        orderedNodes[index].height = it.height
        return result + it.height
      }, 0)
      this.setData({
        "article.height": height,
        "article.nodes": orderedNodes,
        popoverVisible: false
      })
    })
  },

  /**
   * 处理文章编辑区域长按事件
   * @param {Object} e 
   */
  handleArticleNodeLongPress(e) {
    const nodes = this.data.article.nodes
    const index = _.findIndex(nodes, it => it.id === e.currentTarget.id)
    const y = e.touches[0].pageY - this.data.article.top + this.data.article.scrollOffset
    const offset = y - nodes[index].y

    this.setData({
      "article.draging": true,
      "article.activeNodeIndex": index,
      "article.activeNodeY": y - offset,
      "article.touchOffset": offset,
      canScroll: false,
      popoverVisible: false,
    })

    wx.vibrateShort({})
  },

  /**
   * 拖拽节点时的事件
   * @param {Object} e 
   */
  handleArticleNodeTouchMove: function (e) {
    if (!this.data.article.draging) return;

    const nodes = this.data.article.nodes
    const index = this.data.article.activeNodeIndex
    const offset = this.data.article.scrollOffset - this.data.article.top - this.data.article.touchOffset
    const y = e.touches[0].pageY + offset
    this.setData({
      "article.activeNodeY": y,
    })

    let preNodeIndex = -1
    let nxtNodeIndex = -1
    if (nodes[index].sort > 1) {
      preNodeIndex = _.findIndex(nodes, it => it.sort === nodes[index].sort - 1)
    }
    if (nodes[index].sort < nodes.length) {
      nxtNodeIndex = _.findIndex(nodes, it => it.sort === nodes[index].sort + 1)
    }
    if (this.needSwap(preNodeIndex, index)) {
      this.swapNode(preNodeIndex, index)
    }
    if (this.needSwap(nxtNodeIndex, index)) {
      this.swapNode(nxtNodeIndex, index)
    }
  },

  /**
   * 判断两个节点是否需要交换
   * @param {Integer} passiveNode - 被动换位的节点
   * @param {Integer} activeNode - 主动换位的节点
   */
  needSwap(passiveNode, activeNode) {
    if (passiveNode === -1) return false

    const p = this.data.article.nodes[passiveNode]
    const a = this.data.article.nodes[activeNode]

    return (a.sort - p.sort) * (this.data.article.activeNodeY - p.y) < 0
  },

  /**
   * 交换两个节点的位置
   * @param {Integer} passiveNode - 被动换位的节点
   * @param {Integer} activeNode - 主动换位的节点
   */
  swapNode(passiveNode, activeNode) {
    wx.vibrateShort({})

    const nodes = this.data.article.nodes
    const tempSort = nodes[passiveNode].sort
    const tempY = nodes[passiveNode].y

    nodes[passiveNode].sort = nodes[activeNode].sort
    nodes[passiveNode].y = nodes[activeNode].y
    nodes[activeNode].sort = tempSort
    nodes[activeNode].y = tempY

    this.setData({
      ['article.nodes[' + passiveNode + ']']: nodes[passiveNode],
      ['article.nodes[' + activeNode + ']']: nodes[activeNode]
    })
  },

  /**
   * 处理文章编辑区域触碰结束事件
   * @param {Object} e 
   */
  handleArticleNodeTouchEnd(e) {
    const article = this.data.article
    if (!article.draging) return;
    this.setData({
      "article.activeNodeY": article.nodes[article.activeNodeIndex].y,
    })
    setTimeout(() => {
      this.setData({
        "article.draging": false,
        "article.activeNodeIndex": -1,
        "article.activeNodeY": 0,
        canScroll: true,
      })
      this.updateNodes()
    }, 300)
  },

  /**
   * 处理页面滚动事件
   * @param {Object} e 
   */
  handleScroll(e) {
    this.setData({
      "article.scrollOffset": e.detail.scrollTop,
      popoverVisible: false,
    })
  },

  /**
   * 处理节点点击
   * @param {Object} e 
   */
  handleArticleNodeTap(e) {
    // todo
    console.log(e)
  },

  /**
   * 处理点击删除按钮事件
   * @param {Object} e 
   */
  handleRemoveNode(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: "是否删除?",
      success: (res) => {
        if (res.confirm) {
          this.removeNode(id)
        }
      },
    })
  },

  /**
   * 删除节点
   * @param {integer} id 
   */
  removeNode(id) {
    const a = this.data.article
    const index = _.findIndex(a.nodes, it => it.id === id)
    const sort = a.nodes[index].sort

    _.forEach(a.nodes, it => {
      if (it.sort > sort) {
        it.sort--
      }
    })

    a.nodes.splice(index, 1)
    delete a.idDataMap[id]
    this.setData({
      "article.nodes": a.nodes,
      "article.idDataMap": a.idDataMap
    })
    this.updateNodes()
  },

  /**
   * 触发添加按钮
   * @param {Object} e
   */
  async toggleAddBtn(e) {
    const id = e.currentTarget.id
    const index = parseInt(id.split('-')[1])

    wx.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec(res => {
        this.setData({
          popoverRect: _.pick(res[0], ['top', 'left', 'right', 'bottom']),
          popoverVisible: !this.data.popoverVisible
        })
      })
    this.data.currentSort = index
  },

  /**
   * 处理点击弹出框中按钮
   * @param {Object} e 
   */
  handleAddPopItemTap(e) {
    const type = e.detail
    const sort = this.data.currentSort

    switch (type) {
      case "text": this.addTextNode(sort); break;
      case "picture": this.addPicNode(sort); break;
      case "video": this.addVideoNode(sort); break;
      case "location": this.addLocationNode(sort); break;
      case "vote": this.addVoteNode(sort); break;
      case "assemble": this.addAssembleNode(sort); break;
    }
  },

  /**
   * 插入数据
   * @param {Object} node 
   * @param {Object} data 
   */
  insertNode(node, data) {
    const a = this.data.article
    const id = new Date().getTime().toString()

    _.forEach(a.nodes, it => {
      if (it.sort > node.sort) {
        ++it.sort
      }
    })

    a.nodes.push({
      ...node,
      id,
      sort: node.sort + 1
    })
    a.idDataMap[id] = data

    this.setData({
      "article.nodes": a.nodes,
      "article.idDataMap": a.idDataMap
    })
  },

  /**
   * 添加文本节点
   * @param {integer} sort
   */
  addTextNode(sort) {
    const instance = procedures.open('create-article/editors/text')
    const emitter = instance.asCaller()
    emitter.on('getText', (data) => {
      const newNode = {
        sort: sort,
        type: 'base',
      }

      this.insertNode(newNode, {
        text: data.text
      })
    })
  },

  /**
   * 添加照片节点
   * @param {integer} sort 
   */
  addPicNode(sort) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const path = res.tempFiles[0].path

        const newNode = {
          type: 'base',
          sort: sort
        }

        this.insertNode(newNode, {
          pic: path
        })
      }
    })
  },

  /**
   * 添加视频节点
   * @param {integer} sort 
   */
  addVideoNode(sort) {
    wx.chooseVideo({
      compressed: false,
      success: (res) => {
        const newNode = {
          type: 'video',
          sort
        }

        // todo (get token)

        const data = {
          video: res.tempFilePath,
          duration: res.duration
        }

        this.insertNode(newNode, data)
      }
    })
  },

  /**
   * 添加地址节点
   * @param {integer} sort 
   */
  addLocationNode(sort) {
    wx.chooseLocation({
      success: (res) => {
        if (!res.name) {
          wx.showToast({
            icon: 'none',
            title: '请在列表中选择具体位置'
          })
          return;
        }
        const newNode = {
          sort,
          type: 'location'
        }
        this.insertNode(newNode, res)
      }
    })
  },

  /**
   * 添加投票节点
   * @param {integer} sort 
   */
  addVoteNode(sort) {
    const instance = procedures.open('create-article/editors/vote')
    const emitter = instance.asCaller()
    emitter.on('getVote', data => {
      console.log(data)
      if (!data.title) return;

      const newNode = {
        type: 'vote',
        sort
      }

      this.insertNode(newNode, data)
    })
  },

  /**
   * 增加拼图节点
   * @param {*} sort 
   */
  addAssembleNode(sort) {
    wx.chooseImage({
      count: 2,
      sizeType: ['original'],
      sourceType: ['album'],
      success: (res) => {
        const instance = procedures.open("create-article/editors/assemble")
        const emitter = instance.asCaller()
        emitter.emit('init', res.tempFiles)
        emitter.on('getAssemble', path => {
          const newNode = {
            type: 'base',
            sort
          }
          this.insertNode(newNode, {
            pic: path
          })
        })
      }
    })
  },

  /**
   * 处理点击节点再编辑事件
   * @param {Object} e 
   */
  handleEditNode(e) {
    const type = e.detail
    const id = e.currentTarget.dataset.id

    switch (type) {
      case 'text': this.editTextNode(id); break;
      case 'picture': this.editPictrueNode(id); break;
      case 'video': break;
      case 'location': this.editLocationNode(id); break;
      case 'vote': this.editVoteNode(id)
    }
  },

  /**
   * 编辑文字节点
   * @param {string} id 
   */
  editTextNode(id) {
    const a = this.data.article
    const index = _.findIndex(a.nodes, it => it.id === id)

    const emitter = procedures.open('create-article/editors/text').asCaller()

    // sent init data
    emitter.emit('initText', a.idDataMap[a.nodes[index].id])

    emitter.on('getText', data => {
      this.setData({
        ["article.idDataMap." + a.nodes[index].id + ".text"]: data.text
      })
    })
  },

  /**
   * 编辑图片
   * @param {String} id 
   */
  editPictrueNode(id) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const file = res.tempFiles[0]
        this.setData({
          [`article.idDataMap.${id}.pic`]: file.path
        })
      }
    })
  },

  /**
   * 编辑位置节点
   * @param {String} id 
   */
  editLocationNode(id) {
    wx.chooseLocation({
      success: (res) => {
        if (!res.name) {
          wx.showToast({
            icon: 'none',
            title: '请在列表中选择具体位置'
          })
          return;
        }
        this.setData({
          [`article.idDataMap.${id}`]: res
        })
      }
    })
  },

  /**
   * 编辑投票节点
   * @param {String} id 
   */
  editVoteNode(id) {
    const instance = procedures.open('create-article/editors/vote')
    const emitter = instance.asCaller()
    emitter.emit('init', this.data.article.idDataMap[id])
    emitter.on('getVote', data => {
      console.log(data)
      this.setData({
        [`article.idDataMap.${id}`]: data
      })
    })
  },
})
