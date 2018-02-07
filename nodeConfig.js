// export default {
module.exports = {
  mongodb: {
    host: 'mongodb://localhost',
    port: 3001,
    database: '/nodeVueDB',
    opt: {
      useMongoClient: true,
      autoReconnect: true // 自动重连
    }
  }
}


