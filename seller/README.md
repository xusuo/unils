## 礼品网 商家端

vue 后台管理

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 打包测试环境
npm run build test

# 打包正式环境
npm run build prod
```

```bash
# 正式发布步骤
1.npm run build prod
2.资源文件上传到cdn
3.index.html 上传到服务器
```

```bash
# 正式 index.html 需要上传到服务器的文件夹（原因是多个分站，用不同的域名访问）
ucloud(152.32.173.128) 端口：2023
1./data/baokuaidi
2./data/lpdf
3./data/wolipin

鱼塘(47.105.204.216) 端口：22
1./data/gift-web-release/gift-seller
```
