<template>
  <form class="form-horizontal" role="form">
    <fieldset>
      <legend>{{title}} <span class="col-lg-2 col-lg-offset-1" style="color: red">{{user}}</span></legend>
       <div class="form-group">
          <label class="col-sm-4 control-label" for="ds_host">Username</label>
          <div class="col-sm-6">
             <input class="form-control" id="ds_host" type="text" v-model="username" placeholder="Enter Username"/>
          </div>
       </div>
       <div class="form-group">
          <label class="col-sm-4 control-label" for="ds_name">password</label>
          <div class="col-sm-6">
             <input class="form-control" id="ds_name" type="text" v-model="password" placeholder="password"/>
          </div>
       </div>
       <button class="btn btn-primary col-lg-5 col-md-offset-4" @click="submit">提交</button>
       <span style="color: #1093ef" @click="switchMenu"> {{switchName}} </span>
    </fieldset>
  </form>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      isLogin: false,
      user: ''
    }
  },
  computed: {
    switchName () {
      return (this.isLogin ? '老夫且先注册个！' : '待朕前去登录')
    },
    title () {
      return (this.isLogin ? 'login' : 'signup')
    }
  },
  methods: {
    switchMenu () {
      this.isLogin = !this.isLogin
    },
    submit () {
      this.isLogin ? this.login() : this.signup()
    },
    signup () {
      let self = this
      // 获取已有账号密码
      let params = {
        username: this.username
      }
      this.$http.post('/api/getUser', params)
        .then((res) => {
          // 响应成功回调
          if (!res.body.success) {
            window.alert(res.body.result)
            return false
          }
          let params = {
            username: this.username,
            password: this.password
          }
          if (!this.username || !this.password) {
            window.alert('用户名或密码不能为空！')
            return false
          }
          // 创建一个账号密码
          return this.$http.post('/api/signup', params)
        })
        .then((res) => {
          if (res) {
            self.title = 'login'
            self.isLogin = true
            window.alert('注册成功！')
          }
        })
        .catch((reject) => {
          console.log(reject)
        })
    },
    login () {
      let params = {
        username: this.username,
        password: this.password
      }
      if (!this.username || !this.password) {
        window.alert('用户名或密码不能为空！')
        return false
      }
      this.$http.post('/api/login', params)
        .then((res) => {
          if (res.body.success) {
            window.alert('登录成功！')
            this.user = '用户:' + res.body.user.username
          } else {
           window.alert(res.body.result)
          }
        })
        .catch((res) => {
        })
    }
  }
}
</script>
