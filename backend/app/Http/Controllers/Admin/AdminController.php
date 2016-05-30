<?php namespace App\Http\Controllers\Admin;


use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;

class AdminController extends BaseController
{
    /**
     * TODO 这些导航将来要分散在各个子模块中
     * @return array
     */
    public function getNavigators()
    {
        $navigators = [
            'users' => [
                'children' => [
                    'users.create' => [
                        'route' => '/users/create',
                        'text'  => '新增用户'
                    ],
                    'users.list'   => [
                        'route' => '/users',
                        'text'  => '用户列表'
                    ]
                ],
                'text'     => '用户'
            ],
            'posts' => [
                'text'  => '文章',
                'route' => '/posts'
            ]
        ];
        return $navigators;
    }

    /**
     * TODO 这些路由将来要分散在各个子模块中
     * @return array
     */
    public function getRoutes()
    {
        $routes = [
            '/users/create'       => 'users.create',   // '前端路由' => 'vue组件相对路径'
            '/users'              => 'users.list',
            '/users/:userid/edit' => 'users.edit'
        ];
        return $routes;
    }

    /**
     * TODO 组件搜索方案： <br>
     * 1. 先检查 /packages 是否存在自定义； <br>
     * 2. 如果没有，则回归到 app.php 'providers' 里注册的位置
     * @param Request $request
     * @param $component
     * @return mixed
     */
    public function getComponent(Request $request, $component)
    {
        $result = [
            'template' => '<p onclick="alert(\'hi\')">From backend: ' . $component . '</p>'
        ];
        return json_encode($result);
    }
}
