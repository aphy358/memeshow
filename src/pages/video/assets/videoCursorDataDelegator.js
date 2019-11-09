
/**
 * 参考 CursorDataDelegate 接口结构
 */
class VideoCursorDataDelegator {

  cursor(item) {
    return 1//item.id
  }

  loadPrev(cursor, queryLimit) {
    // return Models.video.prev(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1,2,3,4,5])
      }, 3000);
    })
  }

  loadNext(cursor, queryLimit) {
    // return Models.video.next(cursor, queryLimit)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([11,12,13,14,15])
      }, 3000);
    })
  }
}

export default VideoCursorDataDelegator