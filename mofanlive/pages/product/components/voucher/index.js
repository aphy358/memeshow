import "../../assets/1.jpg"
import "../../assets/2.jpg"
import "../../assets/3.jpg"
import "../../assets/4.jpg"
import "../../assets/5.png"
import "../../assets/6.jpg"
import "../../assets/7.jpg"
import "../../assets/8.jpg"
import "../../../../components/avatar/assets/avatar-default-2.png"
import "../../assets/ellipsis.png"
Component({
  data: {
    employee: {
      avatar: "../../assets/8.jpg",
      id: "",
      name: "魔范秀内部员工",
    },
    customerNum: 132,
    customers: [
      {
        id: "customer-1",
        avatar: "../../assets/1.jpg",
      },
      {
        id: "customer-2",
        avatar: "../../assets/2.jpg",
      },
      {
        id: "customer-3",
        avatar: "../../assets/3.jpg",
      },
      {
        id: "customer-4",
        avatar: "../../assets/4.jpg",
      },
      {
        id: "customer-5",
        avatar: "../../assets/5.png",
      },
      {
        id: "customer-6",
        avatar: "../../assets/6.jpg",
      },
      {
        id: "customer-7",
        avatar: "../../assets/ellipsis.png",
      },
    ]
  }
})