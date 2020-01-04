import delivery from "@/data/delivery"
Page({
  data: {
    images: [],
    expectTime: "",
    delivery: {},
    address: "",
    journal: [],
  },
  onLoad(options) {
    this.data.id = options.id
  },

  onReady() {
    this.setData({
      images: ["https://gd2.alicdn.com/imgextra/i4/208763083/TB2cd_mdGQoBKNjSZJnXXaw9VXa_!!208763083.jpg_400x400.jpg"],
      expectTime: "预计2月23日送达",
      delivery: {
        name: "顺丰快递",
        id: "deliveryId1"
      },
      journal: delivery,
    })
  },
})
