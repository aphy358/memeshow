const tabs = [
  {
    name: '美女',
    id: 'beauty'
  },
  {
    name: '帅哥',
    id: 'handsome'
  },
  {
    name: '美女',
    id: 'beauty-1'
  },
  {
    name: '帅哥',
    id: 'handsome-1'
  },
  {
    name: '美女',
    id: 'beauty-2'
  },
  {
    name: '帅哥',
    id: 'handsome-2'
  },
  {
    name: '美女',
    id: 'beauty-3'
  },
  {
    name: '帅哥',
    id: 'handsome-3'
  },
]

const filters = [
  {
    id: 'from',
    name: '渠道',
    values: [
      {
        name: '抖音',
        id: 'douyin'
      },
      {
        name: '快手',
        id: 'kuaishou'
      },
      {
        name: '小红书',
        id: 'redbook'
      },
      {
        name: 'B站',
        id: 'bilibili'
      },
      {
        name: '微信公众号',
        id: 'public'
      },
      {
        name: '其他',
        id: 'other'
      },
    ]
  },
  {
    id: "fan",
    name: "粉丝数",
    values: [
      {
        id: "1-5",
        name: "1-5W"
      },
      {
        id: "5-10",
        name: "5-10W"
      },
      {
        id: "10-50",
        name: "10-50W"
      },
      {
        id: "50-100",
        name: "50-100W"
      },
      {
        id: "100+",
        name: "100W以上"
      },
    ]
  },
  {
    id: 'category',
    name: "领域",
    values: tabs
  },
  {
    id: 'location',
    name: '所在地',
    values: [
      {
        id: 'beijin',
        name: '北京市'
      },
      {
        id: 'shanghai',
        name: '上海市'
      },
      {
        id: 'guangzhou',
        name: '广州市'
      },
      {
        id: 'shenzhen',
        name: '深圳市'
      },
    ]
  }
]

const kol = {
  avatar: "https://gma.alicdn.com/bao/uploaded/i2/13279709/O1CN01xwMGHZ2LalzYED8sa_!!0-saturn_solar.jpg_300x300.jpg",
  name: "陈语嫣",
  fanNum: 3900,
  matchRate: 95,
  tags: ["美女", "搞笑", "短视频"],
  id: "beauty-"
}

export default {
  tabs,
  filters,
  kol,
}