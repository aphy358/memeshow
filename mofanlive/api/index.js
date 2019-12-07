/**
 * API Entry
 */

import _ from "lodash"
import config from "../config/apiConfig.js"

import product from "./Product"

const apiMap = {
  product
}

const apis = _.mapValues(apiMap, cls => new cls({
  baseurl: config.baseUrl
}))

export default apis
