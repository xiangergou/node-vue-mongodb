'use strict'

const root = {
  path: '',
  name: 'login',
  redirect: '/main/login'
}

const routes = [
  root,
  require('./main'),
  {
    path: '*',
    redirect: ''
  }
]

module.exports = routes
