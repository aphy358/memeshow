/**
 * API Entry
 */

import _ from "lodash"
import config from "../config.js"

const apiMap = {
  category: import("./Category")
}

const apis = _.mapValues(apiMap, cls => new cls(config.baseUrl))

export default apis
