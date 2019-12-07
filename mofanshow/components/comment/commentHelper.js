
// 点击了小红心，切换点赞状态
export const switchStarStatus = (comments, commentId) => {
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i]

    if(comment.commentId === commentId){
      comment.iAlreadyStared = !comment.iAlreadyStared
      comment.iAlreadyStared ? comment.starCount++ : comment.starCount--
      return comments

    }else{
      // 如果不是当前这条评论，则尝试着从这条评论的子品论中去查找
      if(comment.childComments){
        for (let j = 0; j < comment.childComments.length; j++) {
          let childComment = comment.childComments[j]
          if(childComment.commentId === commentId){
            childComment.iAlreadyStared = !childComment.iAlreadyStared
            childComment.iAlreadyStared ? childComment.starCount++ : childComment.starCount--
            return comments
          }
        }
      }
    }
  }

  return comments
}

// 添加一条新的评论
export const addNewComment = (comments, newComment) => {
  if(newComment.commentLevel === 2){
    // 如果是二级评论，则插入到对应父评论下的子评论数组头部
    for (let i = 0; i < comments.length; i++) {
      let ele = comments[i]
      if(ele.commentId == newComment.parentId){
        ele.childComments.unshift(newComment)
        break;
      }
    }
  }else{
    // 如果是一级评论，则直接插入到数组的头部
    comments.unshift(newComment)
  }

  return comments
}
