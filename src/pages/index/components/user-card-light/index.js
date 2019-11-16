/**
 * User Card Light Component
 */

Component({
  properties: {
    /**
     * @property {string} name
     * @property {string} avatar - 用户头像链接
     */

    user: Object,

    // 头像是否可预览
    preview: {
      type: Boolean,
      value: false
    }
  },

  externalClasses: ["mf-class"]
})
