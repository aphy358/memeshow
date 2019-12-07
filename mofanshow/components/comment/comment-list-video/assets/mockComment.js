
let count = 0

export const moreComment = () => {
  count++

  let oneComment = {
    // 头像
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569215428999&di=d1d4cf4596acf570302c52efdee74445&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fe7cd7b899e510fb3490cdc55db33c895d0430cde.jpg',
    // 用户 id
    userId: 23,
    // 用户昵称
    nickName: '赵日天' + count,
    // 评论内容
    comment: '一级评论～' + count,
    // 评论层级，1: 第一级评论，  2: 第二级评论
    commentLevel: 1,
    // 评论时间
    commentTime: '2019-9-20 10:00:21',
    commentTimeText: '10分钟前',
    commentId: '24325332' + count,
    // 总点赞数量
    starCount: 97,
    // 我是否已经点赞
    iAlreadyStared: false,
    // 该评论下对应的子评论条数
    childCommentCount: 0,
    // 该评论下对应的子评论（做分页加载？）
    childComments: [
    ],
  }

  return oneComment
}


export const moreChildComment = (parentId) => {
  count++

  let oneComment = {
    avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
    userId: 24,
    nickName: '李东来' + count,
    comment: '二级评论_二级评论_二级评论_二级评论_二级评论——999999' + count,
    commentLevel: 2,
    commentTime: '2019-9-20 10:20:21',
    commentTimeText: '10分钟前',
    commentId: '999999' + count,
    parentId: parentId,
    starCount: 17,
    iAlreadyStared: false,
  }

  return oneComment
}