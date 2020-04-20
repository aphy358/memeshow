Object.defineProperty(exports, "__esModule", {
  value: !0
}),
  (exports.getSystemInfo = function(e) {
    if ("function" != typeof e) return
    t ? e(t) : (n.push(e), o || f())
  }),
  (exports.getSystemInfoSync = function() {
    if (!t)
      try {
        r((t = wx.getSystemInfoSync()))
      } catch (t) {
        ;(0, e.error)({
          name: "getSystemInfoSync 异常",
          error: t
        })
      }
    return t
  })

var e = require("./errLog.js"),
  t = null,
  n = [],
  o = !1

function r(e) {
  for (t = e; n.length > 0; ) {
    n.shift()(e)
  }
}

function f() {
  ;(o = !0),
    wx.getSystemInfo({
      success: function(t) {
        r(t),
          (0, e.debug)({
            name: "wx.getSystemInfo success",
            data: t
          })
      },
      fail: function(t) {
        ;(0, e.error)({
          name: "getSystemInfo 失败",
          data: t
        })
      },
      complete: function() {
        o = !1
      }
    })
}

t || o || f()
