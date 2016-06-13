/**
 * Created by zgldh on 2016/5/30.
 */
// import config from 'backend/zgldh/users/index.js'
import UserEditor from 'zgldh/users/src/Pages/UserEditor'
import UserList from 'zgldh/users/src/Pages/UserList'

var config = {
  admin: {
    routes: {
      // TODO 路由应当直接指向一个 VueJS component
      '/users/create': {
        component: UserEditor
      },
      '/users': {
        component: UserList
      },
      '/users/:userid/edit': {
        component: UserEditor
      }
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
          },
          'users.edit': {
            'route': '/users/66/edit',
            'text': '编辑66'
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
