import _ from "lodash"

let index = 1
export const orders = _.map(new Array(3), () => (
  {
    "id": "order" + index,
    "shop": {
      "id": "mafanshop",
      "name": "开个蛇皮店",
    },
    "status": 0,
    "payMethod": "wechat",
    "refundStatus": 0,
    "items": [
      {
        "itemId": "product" + index,
        "skuId": "sku" + index++,
        "title": "名字很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的商品",
        "specs": "颜色:蓝色, 尺码:xl",
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