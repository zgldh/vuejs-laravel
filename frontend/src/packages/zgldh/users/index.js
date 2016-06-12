/**
 * Created by zgldh on 2016/5/30.
 */
// import config from 'backend/zgldh/users/index.js'

var config = {
  admin: {
    routes: {
      // TODO 路由应当直接指向一个 VueJS component
      '/users/create': 'users.create',   // '前端路由' => 'vue组件相对路径'
      '/users': 'users.list',
      '/users/:userid/edit': 'users.edit'
    },
    navigators: {
      'users': {
        'children': {
          'users.create': {
            'route': '/users/create',
            'text': '新增用户'
          },
          'users.list': {
            'route': '/users',
            'text': '用户列表'
          }
        },
        'text': '用户'
      },
      'posts': {
        'text': '文章',
        'route': '/posts'
      }
    }
  }
}
module.exports = config
