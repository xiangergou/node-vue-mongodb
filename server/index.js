
var express = require('express')
var app = express()
// 引入处理post数据的模块
var bodyParser = require('body-parser')
var port = process.env.PORT || 8088
var mongoose = require("mongoose")
var User = require('../models')
var config = require('../nodeConfig.js').mongodb

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 获取已有账号接口
app.post('/api/getUser',(req, res) => {
  let userdata = req.body
    // 通过模型去查找数据库
    // findOne()返回的是一个对象，而find()返回的是一个数组
  User.Login.find({username: userdata.username}, (err, data, next) => {
      if (err) {
          res.send(err)
      } else {
          if (data.length >= 1) {
            res.json({'success': false, 'result': '该账号已被注册！'})
          } else {
            res.json({'success': true})
          }
      }
  })
})

app.post('/api/signup', (req, res) => {
  let userObj = req.body
  let _user = new User.Login({
    username: userObj.username,
    password: userObj.password
  })
  _user.save((err, data) => {
    if (err) {
        res.send(err);
    } else {
        res.send('createAccount successed');
    }
  })
})

app.post('/api/login', (req, res) => {
  let userdata = req.body
  User.Login.findOne({username: userdata.username, password: userdata.password}, (err, data, next) => {
      if (err) {
          res.send(err)
      } else {
          if (data) {
            res.json({'success': true, 'result': '用户身份验证成功',user: data})
          } else {
            res.json({'success': false, 'result': '用户不存在或密码错误'})
          }
      }
  })
})



mongoose.connect(config.host  + config.database, {useMongoClient:true})
var db = mongoose.connection
db.once("open", function () {
    console.log("Mongo Connected")
    app.listen(config.port)
})
db.on("error", console.error.bind(console, "Mongoose Connection Error"))

