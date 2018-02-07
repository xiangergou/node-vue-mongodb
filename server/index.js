

var fs = require('fs')
var bodyParser = require('body-parser')
var path = require('path')
var port = process.env.PORT || 8088
var mongoose = require("mongoose")
var User = require('./api')
var config = require('../nodeConfig.js').mongodb

var express = require('express')
var app = express()
// var router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// app.use(api)

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))

// app.get('*', function(req, res, next) {
//   let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
//   res.send(html)
// })


// 获取已有账号接口
app.get('/api/getUser',(req,res) => {
    // 通过模型去查找数据库
  User.Login.find((err,data) => {
      if (err) {
          res.send(err)
      } else {
          res.send({data: 'dsads'})
      }
  })
})

app.post('/api/signup', (req, res) => {
  let userObj = req.body
  res.send(userObj)
  // let _user = new User({
  //   username: movieObj.summary,
  //   password: movieObj.flash
  // })
})



mongoose.connect(config.host  + config.database, {useMongoClient:true})
var db = mongoose.connection
db.once("open", function () {
    console.log("Mongo Connected")
    app.listen(config.port)
})
db.on("error", console.error.bind(console, "Mongoose Connection Error"))

