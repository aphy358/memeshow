import procedures from '../index'

import _ from 'lodash'

Page({
  data: {
    article: {
      title: "",
      nodes: [
        {
          id: 'node-1',
          sort: 1,
          y: 0,
          height: 0,
        },
        {
          id: 'node-2',
          sort: 2,
          y: 0,
          height: 0,
        },
        {
          id: 'node-3',
          sort: 3,
          y: 0,
          height: 0,
        },
        {
          id: 'node-4',
          sort: 4,
          y: 0,
          height: 0,
        },
      ],

      activeNodeY: 0,
      activeNodeIndex: -1,
      top: 0,
      height: 0,
      scrollOffset: 0,
      draging: false,
      touchOffset: 0,
    },

    addBtnStates: [],
    canScroll: true,
  },

  onLoad(options) {
    const sid = options.sid
  },

  onReady() {
    this.initArticleTop()
  },

  onShow() {
    this.updateNodes()
  },

  /**
   * 初始化文章编辑区域上边界高度
   */
  initArticleTop() {
    wx.createSelectorQuery().selectAll(".node").boundingClientRect().exec(res => {
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
      if (res[0].length != this.data.article.nodes.length) {
        this.resetAddBtnState(res[0].length.length + 1)
      }

      const orderedNodes = _.orderBy(this.data.article.nodes, 'sort')
      const height = _.reduce(res[0], (result, it, index) => {
        orderedNodes[index].y = result
        orderedNodes[index].height = it.height
        return result + it.height
      }, 0)
      this.setData({
        "article.height": height,
        "article.nodes": orderedNodes,
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
      canScroll: false,
      "article.activeNodeY": y - offset,
      "article.touchOffset": offset
    })
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
    })
  },

  /**
   * 处理点击加号事件
   * @param {*} e 
   */
  handleAddBtnTap(e) {
    const sort = e.currentTarget.dataset.sort

    this.setData({
      ["addBtnStates[" + sort + "]"]: !this.data.addBtnStates[sort]
    })
  },

  /**
   * 将所有按钮重置
   * @param {Integer} number - 按钮个数
   */
  resetAddBtnState(number) {
    this.setData({
      addBtnStates: _.map(new Array(number), it => false)
    })
  }
})