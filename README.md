# vue +  Vuetify 在线影视

## 如何使用

1、下载当前源码源码，安装前端依赖
```
yarn install
```

### 2、运行查看效果
复制配置

```bash
cp env.example .env
```

需要到 `.env` 配置代理地址

将 `VUE_APP_SERVER_URL"`的值改为 `http://162.14.72.65`

```bash
yarn serve
```

### 3、打包
打开 `.env` 文件，修改`VUE_APP_DEBUG=false`

```bash
yarn build
```

### 4、上传到自己的服务器
配置nginx反向代理
```nginx
location / {
   try_files $uri $uri/ /index.html;
   proxy_set_header Host $http_host;
   proxy_set_header App_key $http_app_key;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";
}

location /merchant {
    proxy_pass http://162.14.72.65;
}
```

