
var mongoose = require('mongoose')

//创建模型，这个模型指出了数据库中集合的字段类型
var UserSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

// UserSchema.static.

module.exports = UserSchema