<template>
  <form role="form">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email" v-model="account">
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  v-model="password">
    </div>
    <button type="submit" class="btn btn-primary" @click="login">Submit</button>
</form>

</template>

<script>
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      // 获取已有账号密码
      this.$http.get('/api/getUser')
        .then((response) => {
          // 响应成功回调
          console.log(response)
          let params = {
            account: this.account,
            password: this.password
          }
          // 创建一个账号密码
          return this.$http.post('/api/login/createAccount', params)
        })
        .then((response) => {
          console.log(response)
        })
        .catch((reject) => {
          console.log(reject)
        })
    }
  }
}
</script>
