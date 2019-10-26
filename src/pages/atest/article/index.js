import _ from 'lodash'
import { _comments } from './comments'
import { articleData } from './articleData'

Page({
  data: {
    article: articleData,
    comments: _comments,
  },
  onReady() {
  }
})


