import address from './address'
import _ from "lodash"

let index = 0

export const orders = [{ "id": "EC2020012200032800000034", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 1, "actions": ["close", "pay"], "ctime": 1579622611000, "items": [{ "id": 41833203798018, "productId": 41760912347136, "skuId": 41785983275008, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 1, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012122175100000090", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 1, "actions": ["close", "pay"], "ctime": 1579616273000, "items": [{ "id": 41831542591490, "productId": 41760912347136, "skuId": 41785983275008, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 1, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012111315300000074", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 1, "actions": ["close", "pay"], "ctime": 1579606316000, "items": [{ "id": 41828932161538, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 1, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012111305800000075", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 1, "actions": ["close", "pay"], "ctime": 1579606261000, "items": [{ "id": 41828917743618, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 1, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012110393800000093", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 1, "actions": ["close", "pay"], "ctime": 1579603181000, "items": [{ "id": 41828110340098, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 1, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012110073600000094", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 11, "actions": ["close", "pay"], "ctime": 1579601259000, "items": [{ "id": 41827606499330, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 11, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012109513100000068", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 11, "actions": ["close", "pay"], "ctime": 1579600294000, "items": [{ "id": 41827353530370, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 11, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012109062000000030", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 11, "actions": ["close", "pay"], "ctime": 1579597583000, "items": [{ "id": 41826642857985, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 11, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }, { "id": "EC2020012109061000000018", "shop": { "id": 41605239181312, "name": "用户13247697406的小店", "avatar": "" }, "state": "wait_pay", "totalAmount": 0, "discountAmount": 0, "finalAmount": 0, "postage": 0, "itemNum": 11, "actions": ["close", "pay"], "ctime": 1579597573000, "items": [{ "id": 41826640236546, "productId": 41760912347136, "skuId": 41785983275009, "specs": "", "title": "大善堂猛犸牙吊坠牌子象牙饰品挂件十二生肖本命佛男文玩挂坠", "picture": "https://gd1.alicdn.com/imgextra/i1/3250687166/TB27cinkQ9WBuNjSspeXXaz5VXa_!!3250687166.jpg_400x400.jpg", "num": 11, "price": 9990, "discountPrice": 0, "finalPrice": 0, "discountAmount": 0, "finalAmount": 0 }] }]

export const orders___ = _.map(new Array(3), () => (
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