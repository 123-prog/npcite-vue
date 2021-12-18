## 

## 

## 

## npCite前端 vue+axios

### 项目部署地址：

http://119.91.199.135:1000/



### 测试打包

``` bash
#前端测试
npm install
npm run dev

#打包
npm run build
#打包完的文件在dist目录下
```



### 项目结构

```
/src/assets  静态文件
/src/components  组件目录
/src/router  路由配置
/src/main.js  程序主要文件，也是入口文件
```



### 部署

使用nginx部署

参考配置

因为开发的时候，我用的/api/xxx来代理后端接口，所以这里代理所有/api/xx请求，发送到后端实现前后端分离

```
server {
    listen       80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    location /api {
        rewrite ^.+api/?(.*)$ /$1 break;
        proxy_pass http://springboot:8080;
    }
}

```



