import { moreComment } from './mockComment'


/**
 * 参考 CursorDataDelegate 接口结构
 */
class CommentCursorDataDelegator {

  cursor(item) {
    return item.commentId
  }

  loadPrev(cursor, queryLimit) {
    // return Models.video.prev(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = []
        for (let i = 0; i < 10; i++) {
          res.push(moreComment())
        }
        resolve(res)
      }, 300);
    })
  }

  loadNext(cursor, queryLimit) {
    // return Models.video.next(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = []
        for (let i = 0; i < 10; i++) {
          res.push(moreComment())
        }
        resolve(res)
      }, 300);
    })
  }
}

export default CommentCursorDataDelegator
