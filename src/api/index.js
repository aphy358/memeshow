/**
 * API Entry
 */

const _ = require("lodash")
const config = require("../config.js").api

const apiMap = {
  category: import("./Category")
}

const apis = _.mapValues(apiMap, cls => new cls(apiConfig.baseUrl))

module.exports = apis
