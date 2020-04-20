import { connectComponent } from "wx-redux"
import { subscribeShare } from "@/utils/subscribe.js"
import "./../../assets/group.png"
const Api = wx.X.Api

Component(
  connectComponent(
    state => ({
      userProfile: state.userProfile
    }),
    dispatch => ({})
  )({
    properties: {
      relations: Object
    },

    data: {
      count: 0,

      referrers: [],

      initiator: {}
    },

    observers: {
      relations(relation) {
        if (relation) {
          const initiator = relation.initiator
          const count = relation.ancestorCount
          const referrers = []

          if (relation.parent) {
            referrers.push(relation.parent)
          }

          const { userProfile } = this.data
          // 如果是员工本人或者上一个分享人就是自己，不处理
          if (
            userProfile.id !== initiator.id &&
            (!relation.parent || userProfile.id !== relation.parent.id)
          ) {
            referrers.push({
              id: userProfile.id,
              nickname: userProfile.nickname,
              avatar: userProfile.avatarThumb
            })
          }

          this.setData({
            count,
            initiator,
            referrers
          })
        }
      }
    },

    methods: {
      onclick(e) {
        this.triggerEvent("clickEmployee")
      },

      share() {
        subscribeShare()
      }
    }
  })
)
