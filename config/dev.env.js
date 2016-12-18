var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: '"AIzaSyCl7m-VIrwVYSv6GAjnNJaljDSf669NNAo"',
  AUTH_DOMAIN: '"catch-of-the-day-6753f.firebaseapp.com"',
  DATABASE_URL: '"https://catch-of-the-day-6753f.firebaseio.com"',
  STORAGE_BUCKET: '"catch-of-the-day-6753f.appspot.com"',
  MESSAGING_SENDER_ID: '"355017226736"',
})
