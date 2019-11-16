import _ from 'lodash'
import { _comments } from './assets/comments'
import { articleData, mediumItems } from './assets/articleData'

Page({
  data: {
    article: articleData,
    comments: _comments,


    list: [],
  },
  onReady() {
  },

  onLoad(options) {
    this.fetchList()
  },

  fetchList() {
    this.setData({ list: mediumItems })
  },

  onCircleProgress(e){

  },

})
