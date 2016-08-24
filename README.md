# 正在研究 VueJS2 本库暂时停止更新 

# vuejs-laravel
VueJS + webpack + semantic-UI + Laravel


- 前后分离的快速开发框架。 
- 自带 Laravel 基础的账号系统。
- 前端单页面Web应用
- Webpack 构建前段页面
- 使用 babel 来支持 ECMAScript6
- 使用 Vue 的单文件组件
- 使用最新的 vue-cli 2.0


## 安装

1. 克隆代码
2. 安装后台

    ```
        cd backend
        composer install
        // https://laravel.com/docs/5.2
        php artisan key:generate
        php artisan vendor:publish
        php artisan migrate
    ```

3. 配置Web服务器，需要支持 PHP5.6 以上。 例如域名为 `vuejs-laravel`。服务器 root 配置到项目的`public`目录下。(**千万注意不是`backend/public`**)
4. 安装前台

    ```
        cd frontend
        npm install
        
    ```

5. 配置前台后台代理。打开 `frontend/config.js`, 修改 `proxyTable` 来连接后台API。 参考： [http://vuejs-templates.github.io/webpack/proxy.html](http://vuejs-templates.github.io/webpack/proxy.html)
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

然后编译过的前端代码就出现在 ``` public ``` 目录下。访问你本地的Web服务器即可浏览。

## 路线图
[RoadMap.md](RoadMap.md)

### 参考资料

- Laravel: [http://www.laravel.com](http://www.laravel.com)
- VueJS:  [http://www.vuejs.org](http://www.vuejs.org)
- VueJS Templates: [http://vuejs-templates.github.io/webpack/index.html](http://vuejs-templates.github.io/webpack/index.html)
- Webpack: [http://webpack.github.io](http://webpack.github.io)
- Semantic-UI: [http://semantic-ui.cn](http://semantic-ui.cn)

待续
