import procedures from '../procedures/index'

Page({
  data: {
    bgImg: '/assets/images/background/blurBackgrond.jpg',
    publishEntries: [
      {
        title: '文章创作',
        icon: '/assets/images/background/text.png',
      },
      {
        title: '视频创作',
        icon: '/assets/images/background/video.png',
      },
      {
        title: '直播创作',
        icon: '/assets/images/background/live.png',
      },
    ],


  },

  handleEntryClicked(e) {
    const index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        this.createArticle(); break;
      case 1:
        this.createVideo(); break;
      case 2:
        this.createLive(); break;
    }
  },

  createArticle() {
  },

  createVideo() {
    const instance = procedures.open('create-video', result => {
      console.log(result)
    })
  },

  createLive() {
  }
})