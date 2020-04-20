import _ from 'lodash'
const products = [
  {
    title: "Chillhigh 2020SS赛车主题印花嘻哈滑板时尚纯棉重磅圆领短袖TEE",
    avatar: {
      thumbnail: "https://gma.alicdn.com/bao/uploaded/i3/106302792/O1CN01YvWlOF1WUmPGplsEL_!!0-saturn_solar.jpg_400x400.jpg"
    },
    price: 4000,
    sold: 18900
  },
  {
    avatar: {
      thumbnail: "http://img.alicdn.com/imgextra/i3/783537643/TB2SfeAkwKTBuNkSne1XXaJoXXa_!!783537643-2-beehive-scenes.png_360x360xzq90.jpg"
    },
    title: "施华洛世奇水晶 天使翼 奢侈品矿水",
    price: 4000,
    sold: 1900
  },
  {
    avatar: {
      thumbnail: "http://img.alicdn.com/bao/uploaded/i4/TB1tOF9hbSYBuNjSspiYXFNzpXa_M2.SS2_400x400q90.jpg"
    },
    title: "夏季新款男士短袖t恤撞色印花宽松半袖",
    price: 4000,
    sold: 900
  }
]

var idx = 0
const list = _.map(new Array(20), it => {
  return {
    ...products[idx % 3],
    id: 'p-' + idx++
  }
})

export default {
  list,
  products,
}
