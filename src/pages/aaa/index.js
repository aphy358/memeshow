Page({
  data: {
    newDataList: [],
    dataList: [
    ],
    dataList0: [
      'http://statics.h-five.com/db2.jpg',
      'http://statics.h-five.com/db3.jpg',
      'http://statics.h-five.com/little-love.jpg',
      'http://statics.h-five.com/withme.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=c23b9f9398fc35974a913f18c92c1bed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F03%2F20150903204626_Yi8hC.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=116333425c14113bedd4b987223c5e40&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F07%2F20151207231724_UwXSH.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=61986b64e75b630c8720d773177fbf3b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201406%2F02%2F20140602194925_fWVYn.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=9e28f8829a13289a2eaf1dc50d95837b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F571cf1a863a2be5e6b6565c68901eda1c6da9e5849e03-NSvkIv_fw658',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=af2490b874ed8e04d2f6dd88b2e884e6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F21%2F20170321153911_E8YCa.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=a78cec5339c39b01e525ee4d0f8f94ea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205213208_TtEZh.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=8de4c8a76952ae3b63179ab970e59bb8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F03%2F20140903172242_QEdjJ.png',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=5ae26dd2a293980c5314bd90efc98715&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F386d8715f0f2557ca5f2eb77bfe5ea3a.jpeg%40c_1%2Cw_640%2Ch_1136%2Cx_0%2Cy_0',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=961456995234f28d6ab2bb06a110acd0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F18%2F20150518123943_SHk5m.jpeg',





      'http://statics.h-five.com/db3.jpg',
      'http://statics.h-five.com/little-love.jpg',
      'http://statics.h-five.com/withme.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=c23b9f9398fc35974a913f18c92c1bed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F03%2F20150903204626_Yi8hC.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=116333425c14113bedd4b987223c5e40&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F07%2F20151207231724_UwXSH.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=61986b64e75b630c8720d773177fbf3b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201406%2F02%2F20140602194925_fWVYn.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=9e28f8829a13289a2eaf1dc50d95837b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F571cf1a863a2be5e6b6565c68901eda1c6da9e5849e03-NSvkIv_fw658',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=af2490b874ed8e04d2f6dd88b2e884e6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F21%2F20170321153911_E8YCa.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=a78cec5339c39b01e525ee4d0f8f94ea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205213208_TtEZh.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=8de4c8a76952ae3b63179ab970e59bb8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F03%2F20140903172242_QEdjJ.png',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=5ae26dd2a293980c5314bd90efc98715&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F386d8715f0f2557ca5f2eb77bfe5ea3a.jpeg%40c_1%2Cw_640%2Ch_1136%2Cx_0%2Cy_0',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=961456995234f28d6ab2bb06a110acd0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F18%2F20150518123943_SHk5m.jpeg',
      'http://statics.h-five.com/db2.jpg',
      'http://statics.h-five.com/db3.jpg',
      'http://statics.h-five.com/little-love.jpg',
      'http://statics.h-five.com/withme.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=c23b9f9398fc35974a913f18c92c1bed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F03%2F20150903204626_Yi8hC.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=116333425c14113bedd4b987223c5e40&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F07%2F20151207231724_UwXSH.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=61986b64e75b630c8720d773177fbf3b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201406%2F02%2F20140602194925_fWVYn.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=9e28f8829a13289a2eaf1dc50d95837b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F571cf1a863a2be5e6b6565c68901eda1c6da9e5849e03-NSvkIv_fw658',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=c23b9f9398fc35974a913f18c92c1bed&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201509%2F03%2F20150903204626_Yi8hC.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=116333425c14113bedd4b987223c5e40&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201512%2F07%2F20151207231724_UwXSH.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=61986b64e75b630c8720d773177fbf3b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201406%2F02%2F20140602194925_fWVYn.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=9e28f8829a13289a2eaf1dc50d95837b&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F571cf1a863a2be5e6b6565c68901eda1c6da9e5849e03-NSvkIv_fw658',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=af2490b874ed8e04d2f6dd88b2e884e6&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F21%2F20170321153911_E8YCa.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=a78cec5339c39b01e525ee4d0f8f94ea&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205213208_TtEZh.thumb.700_0.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=8de4c8a76952ae3b63179ab970e59bb8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201409%2F03%2F20140903172242_QEdjJ.png',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648337&di=5ae26dd2a293980c5314bd90efc98715&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F386d8715f0f2557ca5f2eb77bfe5ea3a.jpeg%40c_1%2Cw_640%2Ch_1136%2Cx_0%2Cy_0',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568206648336&di=961456995234f28d6ab2bb06a110acd0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201505%2F18%2F20150518123943_SHk5m.jpeg',
    ],
    dataList2: [0, 1, 2, 3, 4],
    moveTo: 0,
    recyle: false,
    firstIndex: 5,
  },
  onReady() {
    this.setVisibleList()

    // if (this.data.recyle) {
    //   setInterval(() => {
    //     this.setData({
    //       moveTo: (this.data.moveTo + 1) % this.data.dataList.length
    //     })
    //     console.log('change view')
    //   }, 1000)
    // }
  },
  setVisibleList(fIndex){
    let {firstIndex, dataList0} = this.data
    fIndex = fIndex || firstIndex
    if(fIndex < 0 || fIndex > dataList0.length - 3){
    }else{
      this.setData({
        dataList: dataList0.slice(fIndex, fIndex + 3)
      })
    }
  },
  alreadyFirstView(e) {
    console.log('alreadyFirstView', e)
  },
  firstView(e) {
    // console.log('firstView', e)
    let {firstIndex, dataList0} = this.data
    if(firstIndex > 0){
      this.setData({
        firstIndex: firstIndex - 1,
        newDataList: dataList0.slice(firstIndex - 1, firstIndex)
      })
    }
  },
  beforeViewChange(e) {
    // console.log('beforeViewChange', e)
  },
  afterViewChange(e) {
    // console.log('afterViewChange', e)
    let {firstIndex} = this.data
    console.log('firstIndex:' + firstIndex);
  },
  lastView(e) {
    // console.log('lastView', e)
    let {firstIndex, dataList0} = this.data
    let _this = this
    if(firstIndex < dataList0.length - 3){
      setTimeout(() => {
        _this.setData({
          firstIndex: firstIndex + 1,
          newDataList: dataList0.slice(firstIndex + 3, firstIndex + 4)
        })
      }, 300);
    }
  },
  alreadyLastView(e) {
    console.log('alreadyLastView', e)
  },
  viewMove(e) {
    // console.log('viewMove', e)
  },
  onTap(e) {
    console.log(e, '监听到了 tap')
  }
})
