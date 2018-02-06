'use strict'

const main = resolve => { require(['../views/main'], resolve) }
const login = resolve => { require(['../views/main/login'], resolve) }

const subSites = [{
  name: 'login',
  path: 'login',
  component: login
}]

module.exports = {
  name: 'main',
  path: '/main',
  component: main,
  redirect: '/main/login',
  children: subSites
}
