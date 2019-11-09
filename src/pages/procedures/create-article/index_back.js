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

      activeNodeId: '',
      top: 0,
      height: 0,
      scrollOffset: 0,
      draging: false,
    },

    canScroll: true,
    moved: true,
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
    const that = this
    wx.createSelectorQuery().selectAll(".node").boundingClientRect().exec(function (res) {
      const orderedNodes = _.orderBy(that.data.article.nodes, 'sort')
      const height = _.reduce(res[0], (result, it, index) => {
        orderedNodes[index].y = result
        orderedNodes[index].height = it.height
        return result + it.height
      }, 0)
      that.setData({
        "article.height": height,
        // "article.height": 1200,
        "article.nodes": orderedNodes,
      })
    })
  },

  /**
   * 处理文章编辑区域长按事件
   * @param {Object} e 
   */
  handleArticleNodeLongPress(e) {
    this.setData({
      "article.draging": true,
      "article.activeNodeId": e.currentTarget.id,
      canScroll: false,
    })
  },

  /**
   * 处理拖拽节点位置改变事件
   * @param {Object} e
   */
  handleArticleNodeChange(e) {
    const id = e.currentTarget.id
    const article = this.data.article

    if (id != article.activeNodeId) return;
    const nodes = article.nodes
    const index = _.findIndex(nodes, it => it.id === id)
    const currentY = e.detail.y + nodes[index].height / 2
    let preNodeIndex = -1, nxtNodeIndex = -1
    if (nodes[index].sort > 1) {
      preNodeIndex = _.findIndex(nodes, it => it.sort === nodes[index].sort - 1)
    }
    if (nodes[index].sort < nodes.length) {
      nxtNodeIndex = _.findIndex(nodes, it => it.sort === nodes[index].sort + 1)
    }
    if (preNodeIndex != -1 && nodes[preNodeIndex].y + nodes[preNodeIndex].height / 2 > currentY) {
      this.swapNode(preNodeIndex, index)
    }
    if (nxtNodeIndex != -1 && nodes[nxtNodeIndex].y + nodes[nxtNodeIndex].height / 2 < currentY) {
      this.swapNode(nxtNodeIndex, index)
    }
  },

  /**
   * 更新正在拖拽节点的位置
   * @param {Object} e 
   */
  updateActiveNode(e) {
    const id = e.currentTarget.id
    const nodes = this.data.article.nodes
    const index = _.findIndex(nodes, it => it.id === id)
    const y = e.changedTouches[0].pageY - this.data.article.top + this.data.article.scrollOffset + nodes[index].height / 2
    this.setData({
      ['article.nodes[' + index + '].y']: y
    })
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
      ['article.nodes[' + passiveNode + ']']: nodes[passiveNode]
    })
  },

  /**
   * 处理文章编辑区域触碰结束事件
   * @param {Object} e 
   */
  handleArticleNodeTouchEnd(e) {
    this.setData({
      "article.draging": false,
      "article.activeNodeId": '',
      canScroll: true,
      moved: true
    })
    this.updateNodes()
  },

  /**
   * 处理页面滚动事件
   * @param {Object} e 
   */
  handleScroll(e) {
    this.setData({
      "article.scrollOffset": e.detail.scrollTop,
      moved: true,
    })
  },

  handleTouchMove(e) {
    this.setData({
      moved: true
    })
  }
})