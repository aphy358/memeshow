import address from './address'
import _ from "lodash"

let index = 0
export const orders = _.map(new Array(3), () => (
  {
    "id": "E20191212108173745987612039457" + index,
    "shop": {
      "id": "mafanshop",
      "name": "开个蛇皮店",
    },
    "status": index,
    "payMethod": "wechat",
    "refundStatus": 0,
    "items": [
      {
        "itemId": "product" + index,
        "skuId": "sku",
        "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
        "specs": "蓝色 xl",
        "price": 12700,
        "quantity": 1,
        "amount": 12700,
        "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
      },
      {
        "itemId": "product" + index,
        "skuId": "sku" + index++,
        "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
        "specs": "蓝色 xl",
        "price": 12700,
        "quantity": 1,
        "amount": 12700,
        "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
      }
    ],
    "totalAmount": 12700,
    "discountAmount": 0,
    "finalAmount": 12700,
    "postage": 0,
    "actions": [
      "pay"
    ],
  }
))

export const order = {
  "id": "E201912123187643982569874658926",
  "shopId": "mofanshop",
  "shopName": "开个蛇皮店",
  "status": 0,
  "payMethod": "wechat",
  "refundStatus": 0,
  "items": [
    {
      "itemId": "itemId1",
      "skuId": "skuId1",
      "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
      "specs": "蓝色 中码",
      "price": 12300,
      "quantity": 1,
      "amount": 12300,
      "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
      "image": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
      "refundStatus": 0,
    },
    {
      "itemId": "itemId2",
      "skuId": "skuId2",
      "title": "正宗龙窑柴烧建盏落灰杯纯手工粗陶自然落灰釉裸烧茶杯铁胎禅定杯",
      "specs": "蓝色 中码",
      "price": 12300,
      "quantity": 1,
      "amount": 12300,
      "thumbnail": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
      "image": "https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg",
      "refundStatus": 1,
    }
  ],
  "totalAmount": 12300,
  "discountAmount": 0,
  "finalAmount": 12300,
  "postage": 0,
  "actions": [
    "pay"
  ],
  "createTime": 0,
  "address": address[0],
  "payTime": 0,
  "deliveryTime": 0,
  "deliveredTime": 0,
  "refundOrders": [
    {
      "id": "string",
      "type": 0,
      "status": 0,
      "ctime": 0,
      "skuId": "string",
      "quantity": 0
    }
  ],
  "deliveries": [
    {
      "id": "string",
      "status": 0
    }
  ]
}