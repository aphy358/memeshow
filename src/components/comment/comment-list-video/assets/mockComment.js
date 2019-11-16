
let count = 0

export const moreComment = () => {
  count++

  let oneComment = {
    avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
    userId: 24,
    nickName: '李东来' + count,
    comment: '二级评论_二级评论_二级评论_二级评论_二级评论' + count,
    commentLevel: 2,
    commentTime: '2019-9-20 10:20:21',
    commentTimeText: '10分钟前',
    commentId: 243255,
    parentId: 243254,
    starCount: 17,
    iAlreadyStared: false,
  }

  return oneComment
}
