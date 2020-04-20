var e = require("../@babel/runtime/helpers/interopRequireDefault")

Object.defineProperty(exports, "__esModule", {
  value: !0
}),
  (exports.init = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    ;(a = e.config || {}),
      (s.page_name = a.appName + ("production" === a.env ? "" : a.env)),
      (s.page_url = "wxapp://" + a.appId + "/pages/"),
      (s.app_version = a.version),
      (s.env = a.env),
      r()
  }),
  (exports.error = function(e) {
    return p.apply(this, arguments)
  }),
  (exports.debug = function(e) {
    return c.apply(this, arguments)
  }),
  (exports.setErrLogParams = function(e) {
    Object.assign(s, e)
  }),
  (exports.setIsDebug = function() {
    !0
  })

var r,
  n = e(require("../@babel/runtime/regenerator")),
  t = e(require("../@babel/runtime/helpers/asyncToGenerator")),
  a = {},
  o = {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json;charset=UTF-8",
    "Cache-Control": "no-cache"
  },
  s = {
    platform: "wxapp",
    log_version: "1.0.0",
    network: 0,
    error_code: "h5_page_exception",
    http_code: "",
    system: "",
    payload: {}
  },
  i = new Promise(function(e) {
    r = e
  })

function u(e) {
  wx.request({
    url: a.errLogDomain + "/tne.gif",
    method: "POST",
    data: e,
    header: o
  })
}

function p() {
  return (p = (0, t.default)(
    n.default.mark(function e(r) {
      var t, o, p, c, d, f, g, l
      return n.default.wrap(function(e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (t = r.name),
                (o = r.data),
                (p = r.msg),
                (c = r.error),
                (e.next = 3),
                i
              )

            case 3:
              try {
                ;["dev", "hutaojie", "panduoduo"].indexOf(a.env) > -1 &&
                  console.error(t, p || "", o, c),
                  ["production", "prod", "panduoduo"].indexOf(a.env) > -1 &&
                    ((f = (d = c || {}).message),
                    (g = d.stack),
                    (l =
                      t +
                      " " +
                      JSON.stringify({
                        msg: p,
                        data: o,
                        message: f,
                        stack: g
                      })),
                    u(
                      Object.assign({}, s, {
                        page: l
                      })
                    ))
              } catch (e) {}

            case 4:
            case "end":
              return e.stop()
          }
      }, e)
    })
  )).apply(this, arguments)
}

function c() {
  return (c = (0, t.default)(
    n.default.mark(function e(r) {
      var t, o, p, c, d, f, g, l, m
      return n.default.wrap(function(e) {
        for (;;)
          switch ((e.prev = e.next)) {
            case 0:
              return (
                (t = r.name),
                (o = r.data),
                (p = r.msg),
                (c = r.error),
                (e.next = 3),
                i
              )

            case 3:
              try {
                ;["dev", "hutaojie", "test", "panduoduo"].indexOf(a.env) > -1 &&
                  console.warn(t, p || "", o, c),
                  ["production", "prod", "panduoduo"].indexOf(a.env) > -1 &&
                    ((f = (d = c || {}).message),
                    (g = d.stack),
                    (l =
                      "debugInfo:" +
                      t +
                      " " +
                      JSON.stringify({
                        msg: p,
                        data: o,
                        message: f,
                        stack: g
                      })),
                    ((m = Object.assign({}, s, {
                      page: l,
                      error_msg: l
                    })).platform = "unknown"),
                    u(m))
              } catch (e) {}

            case 4:
            case "end":
              return e.stop()
          }
      }, e)
    })
  )).apply(this, arguments)
}
