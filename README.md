
## Node-Vue-MongoDB 实现表单注册登录(极适node练手)
==================================

- **项目简介**： 基于node、vue及mongoDB等搭建的简易表单注册登录，尝试下用vue亲自宠幸node。
 
- *思路* :  
  1.前后端分离开发，前端用bootstrap搭建页面，后端由node搭建接口提供数据交互接口。  
  2.通过Vue-Cli中提供的proxyTable进行代理，借以跨域调用Node编写的API。 
  
- **主要工具** ：

  - Vue-Cli
  - Node + Express
  - MongoDB
  - Vue-Resource
  - Supervisor
  - bootstrap

- **主要流程** ：

  1.安装Vue-Cli  
    此处注意： (vue-cli版本更新后默认关闭了自动打开浏览器，若有需要可在config/index.js)
    ```
     host: 'localhost', // can be overwritten by process.env.HOST
    port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false, // 恩，就是字面意思
    ```
  2.引入bootstrap (这方面度娘懂得老多了)
  3.开整：
   - 表单搭建，无甚好说。   
   ```
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
const signButton = '老夫且先注册个'
const loginButton = '待朕前去登录'
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
      return (this.isLogin ? signButton : loginButton)
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
      if (!this.username || !this.password) {
            window.alert('用户名或密码不能为空！')
            return false
          }
      let params = {
        username: this.username
      }
      // 获取已有账号密码
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
 ```
   > npm run dev  

    此时若无意外即可看到光秃秃的表单呈现，按钮点击无反应且会报错。莫急，且先搭建接口。
    - 目录结构大致长这样儿  
    此处放图~
    至此，后端可以开整了
    > npm install express –-save-dev  
    
    再来一个
    > npm i -g supervisor  
    
    安装这玩意儿的意义在于，在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，当真神器也。  
    使用也方便，将启动命令的‘node’替换成‘supervisor’即可。
      
    #### 默认项nodeConfig.js  
    ```
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
    ```
    将配置项单独拎出来是个好习惯，猫叔教我的。
    
    #### node入口模块 sever/index.js  
    ```
    ```  
    #### 
    ----------------------------
    至此，整个项目的接口就搭建好了，这时去点击注册登录按钮，却报出了504，莫急，这是因为我们前端在3000端口，而后台却运行在3001，跨域问题妥妥的。 事实上脚手架已然解决掉这个问题，在  
    【项目目录截图】  
    
    至此，整个项目就算基本完成，事实上这也是鄙人node初探，期间也踩过不少坑，但最终还是实现了功能。  下一期用vue+node+socket.io 做一个聊天系统，这一期就到这儿，荆轲刺秦王。
    


