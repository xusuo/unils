'use strict'
let VERSION = process.argv[2] || 'prod'
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"http://192.168.0.251:8000/api/v1"', //发布环境
  VERSION: '"' + VERSION + '"'
}
