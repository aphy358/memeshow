import { moreComment, moreChildComment } from './mockComment'


/**
 * 参考 CursorDataDelegate 接口结构
 */
class CommentCursorDataDelegator {

  cursor(item) {
    return item.commentId
  }

  loadPrev(options) {
    // return Models.video.prev(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { parentId } = options
        let res = []
        for (let i = 0; i < 10; i++) {
          parentId
            ? res.push(moreChildComment(parentId))
            : res.push(moreComment())
        }
        resolve(res)
      }, 300);
    })
  }

  loadNext(options) {
    // return Models.video.next(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { parentId } = options
        let res = []
        for (let i = 0; i < 10; i++) {
          parentId
            ? res.push(moreChildComment(parentId))
            : res.push(moreComment())
        }
        resolve(res)
      }, 300);
    })
  }
}

export default CommentCursorDataDelegator
