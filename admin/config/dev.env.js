'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let VERSION = process.argv[2] || 'prod'

// console.log(process.argv)

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.0.251:8000/api/v1"',   //生产环境
  VERSION: '"prod"'
})
