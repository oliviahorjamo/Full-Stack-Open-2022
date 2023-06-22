require('dotenv').config()
// note that these should not be locally as these are
// the urls required by docker
// however, for some reason setting the env variables in .env
// and dev.Dockerfile don't work
const MONGO_URL = 'mongodb://the_username:the_password@mongo:27017/the_database'
const REDIS_URL = 'redis://redis:6379'

module.exports = {
  MONGO_URL,//: process.env.MONGO_URL,//: 'mongodb://the_username:the_password@localhost:3456/the_database',
  REDIS_URL//: process.env.REDIS_URL//: '//localhost:6378'
}