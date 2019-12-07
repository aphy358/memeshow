import _ from 'lodash'
import { _comments } from '@/data/comments'
import { articleData, mediumItems } from '@/data/articleData'

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
