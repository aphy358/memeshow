import _ from 'lodash'

var i = 0
export const productList = _.map(new Array(10), () => ({
  id: i++,
  name: "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
  price: 99900,
  imgUrl: "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
  thumbnail: "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
  tips: [
    {
      title: "立减10",
      id: 'tip1'
    }
  ],
  live: true
}))

export const product = {
  "code": 0,
  "msg": "success",
  "data": {
    "id": "string",
    "sn": "string",
    "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
    "image": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
    "price": 12700,
    "originPrice": 13800,
    "type": 0,
    "stock": 99,
    "soldCount": 67,
    "createTime": 0,
    "updateTime": 0,
    "shop": {
      "name": "魔范小店",
      "avatar": "",
      "id": "mofanshop",
    },
    "avatar": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
    "categoryId": [
      "string"
    ],
    "medias": [
      {
        "type": "IMG",
        "id": "img1",
        "url": "http://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg",
        "medium": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
        "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
        "createTime": 0,
        "updateTime": 0
      },
      {
        "type": "IMG",
        "id": "img2",
        "url": "http://gd1.alicdn.com/imgextra/i1/208763083/TB2WZ_mnbSYBuNjSspfXXcZCpXa_!!208763083.jpg",
        "medium": "https://gd1.alicdn.com/imgextra/i1/208763083/TB2WZ_mnbSYBuNjSspfXXcZCpXa_!!208763083.jpg_400x400.jpg",
        "thumbnail": "https://gd1.alicdn.com/imgextra/i1/208763083/TB2WZ_mnbSYBuNjSspfXXcZCpXa_!!208763083.jpg_400x400.jpg",
      }
    ],
    "desc": "<img src=\"https://img.alicdn.com/imgextra/i3/380806445/TB2qbFHepYM8KJjSZFuXXcf7FXa_!!380806445.jpg\" /><img src=\"https://img.alicdn.com/imgextra/i1/380806445/TB24DIJl46I8KJjSszfXXaZVXXa_!!380806445.jpg\" />",
    "tags": [
      {
        "id": "string",
        "name": "string",
        "createTime": 0
      }
    ],
    "skus": [
      {
        "id": "sku1",
        "itemId": "string",
        "specs": [
          {
            "kid": "k1",
            "vid": "v1",
            "k": "颜色",
            "v": "红色"
          },
          {
            "kid": "k2",
            "vid": "v3",
            "k": "尺码",
            "v": "大杯"
          }
        ],
        "price": 12100,
        "stock": 4,
        "soldCount": 7,
      }, {
        "id": "sku2",
        "itemId": "string",
        "specs": [
          {
            "kid": "k1",
            "vid": "v1",
            "k": "颜色",
            "v": "红色"
          },
          {
            "kid": "k2",
            "vid": "v4",
            "k": "尺码",
            "v": "小杯"
          }
        ],
        "price": 12200,
        "stock": 4,
        "soldCount": 7,
      }, {
        "id": "sku3",
        "itemId": "string",
        "specs": [
          {
            "kid": "k1",
            "vid": "v2",
            "k": "颜色",
            "v": "蓝色"
          },
          {
            "kid": "k2",
            "vid": "v3",
            "k": "尺码",
            "v": "大杯"
          }
        ],
        "price": 12300,
        "stock": 4,
        "soldCount": 7,
      }, {
        "id": "sku2",
        "itemId": "string",
        "specs": [
          {
            "kid": "k1",
            "vid": "v2",
            "k": "颜色",
            "v": "蓝色"
          },
          {
            "kid": "k2",
            "vid": "v4",
            "k": "尺码",
            "v": "小杯"
          }
        ],
        "price": 12400,
        "stock": 0,
        "soldCount": 7,
      },
    ],
    "skuImages": [
      {
        "kid": "k1",
        "vid": "v1",
        "url": "https://gd2.alicdn.com/imgextra/i3/2040456184/TB2MEdIgbFkpuFjy1XcXXclapXa_!!2040456184.jpg_400x400.jpg",
        "medium": "https://gd2.alicdn.com/imgextra/i3/2040456184/TB2MEdIgbFkpuFjy1XcXXclapXa_!!2040456184.jpg_400x400.jpg",
        "thumbnail": "https://gd2.alicdn.com/imgextra/i3/2040456184/TB2MEdIgbFkpuFjy1XcXXclapXa_!!2040456184.jpg_400x400.jpg"
      },
      {
        "kid": "k1",
        "vid": "v2",
        "url": "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg",
        "medium": "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg",
        "thumbnail": "https://gd1.alicdn.com/imgextra/i1/2040456184/TB2HSeucYBnpuFjSZFGXXX51pXa_!!2040456184.jpg_400x400.jpg"
      },
    ],
    "extra": {
      "isFavorite": true
    }
  }
}

export const trades = [
  {
    shop: {
      id: 'mafanshop',
      name: '魔范小店',
      avatar: '',
    },
    items: [
      {
        "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
        price: 12300,
        stock: 99,
        quantity: 2,
        id: 'skuId1',
        "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
        productId: 'productId1',
        "specs": "蓝色 小杯",
      },
      {
        "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
        price: 12300,
        stock: 99,
        quantity: 2,
        id: 'skuId2',
        "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
        productId: 'productId1',
        "specs": "蓝色 小杯",
      }
    ],
    coupon: [
      {
        id: 'stupidcoupon1',
        price: 500,
        source: '平台优惠券',
        name: '用了变傻逼券',
        expiry: "2019.12.30-2020.1.1",
        condition: "满200使用",
        disabled: false,
        used: true,
      },
      {
        id: 'stupidcoupon2',
        price: 2200,
        source: '商家优惠券',
        expiry: "2019.12.30-2020.11.30",
        condition: "满200使用",
        disabled: true,
        used: false,
      },
    ]
  }
]