
// test data for comments
const _comments = [
  {
    // 头像
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569215428999&di=d1d4cf4596acf570302c52efdee74445&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fe7cd7b899e510fb3490cdc55db33c895d0430cde.jpg',
    // 用户 id
    userId: 23,
    // 用户昵称
    nickName: '赵日天',
    // 评论内容
    comment: '一级评论～',
    // 评论层级，1: 第一级评论，  2: 第二级评论
    commentLevel: 1,
    // 评论时间
    commentTime: '2019-9-20 10:00:21',
    commentTimeText: '10分钟前',
    commentId: 243253,
    // 总点赞数量
    starCount: 9197,
    // 我是否已经点赞
    iAlreadyStared: true,
    // 该评论下对应的子评论条数
    childCommentCount: 0,
    // 该评论下对应的子评论（做分页加载？）
    childComments: [
    ],
  },

  {
    // 头像
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569215428999&di=d1d4cf4596acf570302c52efdee74445&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fe7cd7b899e510fb3490cdc55db33c895d0430cde.jpg',
    // 用户 id
    userId: 23,
    // 用户昵称
    nickName: '赵日天',
    // 评论内容
    comment: '拔刀吧，呃呃～',
    // 评论层级，1: 第一级评论，  2: 第二级评论
    commentLevel: 1,
    // 评论时间
    commentTime: '2019-9-20 10:00:21',
    commentTimeText: '10分钟前',
    commentId: 243254,
    // 总点赞数量
    starCount: 197,
    // 我是否已经点赞
    iAlreadyStared: true,
    // 该评论下对应的子评论条数
    childCommentCount: 2,
    // 该评论下对应的子评论（做分页加载？）
    childComments: [
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 243255,
        parentId: 243254,
        starCount: 17,
        iAlreadyStared: false,
        // 回复对象（可能是直接回复的父评论，也可能是回复的其他子评论）
        replyTo: {
          userId: 24,
          nickName: '李东来',
        }
      },
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 243256,
        parentId: 243254,
        starCount: 17,
        iAlreadyStared: false,
      }
    ],
  },

  {
    // 头像
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569215428999&di=d1d4cf4596acf570302c52efdee74445&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fe7cd7b899e510fb3490cdc55db33c895d0430cde.jpg',
    // 用户 id
    userId: 23,
    // 用户昵称
    nickName: '赵日天',
    // 评论内容
    comment: '拔刀吧，呃呃～拔刀吧，呃呃～拔刀吧，呃呃～拔刀吧，呃呃～拔刀吧，呃呃～',
    // 评论层级，1: 第一级评论，  2: 第二级评论
    commentLevel: 1,
    // 评论时间
    commentTime: '2019-9-20 10:00:21',
    commentTimeText: '10分钟前',
    commentId: 243257,
    // 总点赞数量
    starCount: 197,
    // 我是否已经点赞
    iAlreadyStared: true,
    // 该评论下对应的子评论条数
    childCommentCount: 1,
    // 该评论下对应的子评论（做分页加载？）
    childComments: [
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。二级评论。。。二级评论。。。二级评论。。。二',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 243258,
        parentId: 243257,
        starCount: 17,
        iAlreadyStared: false,
      }
    ],
  },

  {
    // 头像
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569215428999&di=d1d4cf4596acf570302c52efdee74445&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fe7cd7b899e510fb3490cdc55db33c895d0430cde.jpg',
    // 用户 id
    userId: 23,
    // 用户昵称
    nickName: '赵日天',
    // 评论内容
    comment: '拔刀吧，呃呃～',
    // 评论层级，1: 第一级评论，  2: 第二级评论
    commentLevel: 1,
    // 评论时间
    commentTime: '2019-9-20 10:00:21',
    commentTimeText: '10分钟前',
    commentId: 243259,
    // 总点赞数量
    starCount: 197,
    // 我是否已经点赞
    iAlreadyStared: true,
    // 该评论下对应的子评论条数
    childCommentCount: 2,
    // 该评论下对应的子评论（做分页加载？）
    childComments: [
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 24325410,
        parentId: 243259,
        starCount: 17,
        iAlreadyStared: false,
      },
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 24325411,
        parentId: 243259,
        starCount: 17,
        iAlreadyStared: false,
      }
    ],
  },

  {
    // 头像
    avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569215428999&di=d1d4cf4596acf570302c52efdee74445&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fe7cd7b899e510fb3490cdc55db33c895d0430cde.jpg',
    // 用户 id
    userId: 23,
    // 用户昵称
    nickName: '赵日天',
    // 评论内容
    comment: '拔刀吧，呃呃～',
    // 评论层级，1: 第一级评论，  2: 第二级评论
    commentLevel: 1,
    // 评论时间
    commentTime: '2019-9-20 10:00:21',
    commentTimeText: '10分钟前',
    commentId: 24325312,
    // 总点赞数量
    starCount: 197,
    // 我是否已经点赞
    iAlreadyStared: true,
    // 该评论下对应的子评论条数
    childCommentCount: 2,
    // 该评论下对应的子评论（做分页加载？）
    childComments: [
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 24325413,
        parentId: 24325312,
        starCount: 17,
        iAlreadyStared: false,
      },
      {
        avatar: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1197039898,3476709019&fm=179&app=42&f=JPEG?w=121&h=140',
        userId: 24,
        nickName: '李东来',
        comment: '二级评论。。。',
        commentLevel: 2,
        commentTime: '2019-9-20 10:20:21',
        commentTimeText: '10分钟前',
        commentId: 24325414,
        parentId: 24325312,
        starCount: 17,
        iAlreadyStared: false,
      }
    ],
  },

]

module.exports = {
  _comments
}
