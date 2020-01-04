import address from "@/data/address"

export default [
  {
    detail: "[收货地址]" + address[0].province + address[0].city + address[0].district + address[0].address,
  },
  {
    title: "运输中",
    detail: "深圳市【深圳大冲分发中心】",
    time: "2:30",
    date: "2-3",
  },
  {
    title: "已发货",
    detail: "商品出库",
    time: "14:30",
    date: "2-2",
  },
  {
    detail: "创建订单成功",
    time: "12:30",
    date: "2-2",
  },
]