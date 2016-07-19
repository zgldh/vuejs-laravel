/**
 * Created by zgldh on 2016/5/30.
 * 这是 zgldh/vuejs-laravel-user 组件的配置文件。
 * 包含路由、菜单配置等。 有待后续扩展
 */
import UserEditor from 'zgldh/VuejsLaravelUser/vue/Pages/UserEditor'
import UserList from 'zgldh/VuejsLaravelUser/vue/Pages/UserList'

var config = {
  admin: {
    routes: {
      // 路由应当直接指向一个 VueJS component
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
      // 显示在左侧菜单的导航.
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
