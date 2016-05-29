<?php namespace App\Http\Controllers\Admin;


use App\Http\Controllers\BaseController;

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
            'users.create' => [
                'route'     => '/users/create',
                'component' => './Pages/Users/Create.vue'
            ],
            'users.list'   => [
                'route'     => '/users',
                'component' => './Pages/Users/List.vue'
            ],
        ];
        return $routes;
    }
}
