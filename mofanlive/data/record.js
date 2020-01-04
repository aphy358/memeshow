export const record = [
  {
    id: 'record1',
    from: 'seller',
    createTime: "2019-12-20 12:00:00",
    text: [
      {
        title: '退款金额',
        type: 'price',
        content: 5900
      },
      {
        type: 'detail',
        content: '同意退款给买家，本次维权结束'
      }
    ]
  },
  {
    id: 'record2',
    from: 'customer',
    createTime: "2019-12-20 12:00:00",
    text: [
      {
        title: '退款金额',
        type: 'price',
        content: 5900
      },
      {
        title: '退款类型',
        type: 'detail',
        content: '卖家已发货，买家未收到货，全额退款',
      },
      {
        title: '退款原因',
        type: 'detail',
        content: '拍错/多拍/不喜欢',
      },
      {
        title: '退款说明',
        type: 'detail',
        content: '质量太差了质量太差了质量太差了质量太差了质量太差了质量太差了质量太差了',
      },
    ],
    images: [
      "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg",
      "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg",
      "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg",
    ]
  }
]

export const order = {
  refundId: 'R1982739182673058170893475',
  orderId: 'E1786347816923759771',
  product: {
    thumbnail: "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg",
    title: "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
    state: "已发货",
    price: 5900,
    quantity: 1,
  }
}