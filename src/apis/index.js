const _ = require('lodash')
const apiConfig = require('../config').api

const apiMap = {
  // shop: require('./Shop')
}

const apis = _.mapValues(apiMap, cls => new cls(apiConfig.baseUrl))

module.exports = apis