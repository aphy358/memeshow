
/**
 * 大列表滚动管理器
 */
class BigListScroller {
  /**
   * options: {
   *   dataList,            // <String>: 必填，大列表在页面中渲染的数据项
   *   itemSelector,        // <String>: 必填，每个数据项在页面中的选择器（比如：'.data-item'）
   *   hideVisibleHeight,   // <Number>: 预设大列表上下两端被遮挡的数据项所占高度（超出这个范围的数据项将不渲染，而它们的高度将转嫁到列表上下两端的占位元素上），当 scrollDirection === 'y' 的时候传递
   *   hideVisibleWidth,    // <Number>: 预设大列表左右两端被遮挡的数据项所占高度（超出这个范围的数据项将不渲染，而它们的高度将转嫁到列表上下两端的占位元素上），当 scrollDirection === 'x' 的时候传递
   *   lengthLimit,         // <Number>: 列表数据项总条数限制
   *   scrollDirection,     // <String>: 列表滚动的方向（x: 水平，  y: 垂直）
   *   listHeight,          // <String>: 列表可视区的高度，当 scrollDirection === 'y' 的时候传递
   *   listWidth,           // <String>: 列表可视区的宽度，当 scrollDirection === 'x' 的时候传递
   * }
   */
  constructor(options) {
    if (typeof options === 'undefined') throw new Error(`you should pass in 'options' for BigListScroller !`)
    if (typeof options.dataList === 'undefined') throw new Error(`'dataList' not found in options !`)
    if (typeof options.itemSelector === 'undefined') throw new Error(`'itemSelector' not found in options !`)

    // 当前大列表所在页面/组件
    options.context = options.context || null
    options.scrollDirection = options.scrollDirection || 'y'
    options.listHeight = options.listHeight || 667
    options.listWidth = options.listWidth || 375
    options.hideVisibleHeight = options.hideVisibleHeight || 300
    options.hideVisibleWidth = options.hideVisibleWidth || 300
    options.lengthLimit = options.lengthLimit || 200
    this.options = options

    // 列表数据项数组
    this.dataList = []

    // 迭代器，内部数据项以这个作为唯一标识，添加新数据则迭代器自增
    this.iterator = 0
  }

  // 添加数据项
  addItems(arr) {
    this.checkContext()

    if (!Array.isArray(arr)) arr = [arr]

    arr.forEach(ele => { ele.iterator = ++this.iterator, ele.hide = false });
    this.dataList = this.dataList.concat(arr)

    let { context, dataList, lengthLimit } = this.options

    if (this.dataList.length >= 2 * lengthLimit) {
      
      this.dataList = this.dataList.slice(-lengthLimit)
      this.dataList.forEach(ele => { ele.hide = false });

      context.setData(
        {
          [dataList]: this.dataList,
          _pholderTopStyle_: '',
          _pholderBottomStyle_: '',
        }, 
        this.setItemDimensions()
      )

    } else {
      // 先将新增的数据项插入到页面中
      // 渲染之后，调用 setItemDimensions 将每个数据项在页面的高度或宽度记录下来
      context.setData(
        { [dataList]: this.dataList }, 
        this.setItemDimensions()
      )
    }
  }

  // 设置 this.dataList 里相关数据项在页面中占的高度或宽度
  setItemDimensions() {
    const { context, itemSelector, scrollDirection } = this.options
    const query = wx.createSelectorQuery()

    query.in(context).selectAll(itemSelector).boundingClientRect()
    query.exec(res => {
      res[0].forEach(ele => {
        if (!ele.dataset.iterator) throw new Error(`missing dataset of 'iterator' for items !`)
        let iterator = ele.dataset.iterator
        scrollDirection === 'y'
          ? this.dataList.find(n => n.iterator === iterator).height = ele.height
          : this.dataList.find(n => n.iterator === iterator).width = ele.width
      });
    })
  }

  _scrollList(e) {
    let { scrollHeight, scrollTop, scrollWidth, scrollLeft } = e.detail
    const { context, scrollDirection, hideVisibleHeight, hideVisibleWidth, listHeight, listWidth, dataList } = this.options

    // 列表上下两端隐藏数据项的总高度
    let topHideItemsHeight = 0
    let bottomHideItemsHeight = 0

    // 列表上下两端占位元素样式
    let _pholderTopStyle_ = ''
    let _pholderBottomStyle_ = ''
    
    let iterateHeight = 0

    if (scrollDirection === 'x') {  // 列表横向滚动
      // TO DO，一般不会采用水平方向的大列表，暂时偷懒不写了，后续有需要再补充
      
    } else {    // 列表纵向滚动
      for (let i = 0; i < this.dataList.length; i++) {
        const ele = this.dataList[i]

        iterateHeight += ele.height

        if (scrollTop - ele.height > hideVisibleHeight) {
          scrollTop -= ele.height
          ele.hide = true
          topHideItemsHeight += ele.height

        } else if (iterateHeight > topHideItemsHeight + 2 * hideVisibleHeight + listHeight) {
          ele.hide = true
          bottomHideItemsHeight += ele.height

        } else {
          ele.hide = false
        }
      }

      _pholderTopStyle_ = `height: ${topHideItemsHeight}px;`
      _pholderBottomStyle_ = `height: ${bottomHideItemsHeight}px;`

      context.setData({
        _pholderTopStyle_,
        _pholderBottomStyle_,
        [dataList]: this.dataList
      })
    }
  }

  // 大列表滚动
  scrollList(e) {
    let _now = Date.now()
    let timeGap = 100

    // 节流控制
    if (
      (this.scrollThrottle && _now - this.scrollThrottle > timeGap) || 
      !this.scrollThrottle
    ) {
      this.scrollThrottle = _now
      this._scrollList(e)
    }
  }

  // 绑定上下文（页面或组件）
  bindContext(context) {
    this.options.context = context

    context.setData({
      _pholderTopStyle_: '',
      _pholderBottomStyle_: '',
    })
  }

  checkContext() {
    if (!this.options.context) throw new Error(`you should bind a 'context' for BigListScroller !`)
  }
}

export default BigListScroller
