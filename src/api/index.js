const _ = require("lodash")
const apiConfig = require("../config").api

const apiMap = {
  category: import("./Category")
}

const apis = _.mapValues(apiMap, cls => new cls(apiConfig.baseUrl))

module.exports = apis
