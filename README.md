# vuejs-laravel
VueJS + webpack + semantic-UI + Laravel


- 前后分离的快速开发框架。 
- 自带Laravel基础的账号系统。
- 前端单页面Web应用
- Webpack构建前段页面
- 使用babel来支持ECMAScript6
- 使用Vue的单文件组件


## 安装

1. 克隆代码
2. 安装后台

```
    cd backend
    composer install
    // https://laravel.com/docs/5.2
    php artisan key:generate
    php artisan migrate
```

3. 配置后台服务器。 例如域名为 `vuejs-laravel`
4. 安装前台

```
    cd frontend
    npm install
    
```

5. 配置前台后台代理。打开 `frontend/build/dev-server.js`, 修改变量 `devBackendDomain` 为第三步的域名。
6. 完毕

## 开发

```
    cd frontend
    npm run dev
```

然后访问 http://localhost:8080 

``` frontend/src ``` 目录包含了前端代码。代码改动能实时反映在浏览器里，我百思不得其解。

``` backend ``` 目录里面就是典型的Laravel后端代码

## 发布

```
    cd frontend
    npm run build
```

然后编译过的前端代码就出现在 ``` public ``` 目录下。

### 参考资料

- Laravel: http://www.laravel.com/
- VueJS:  http://www.vuejs.org
- Webpack: http://webpack.github.io
- Semantic-UI: http://semantic-ui.cn

待续
