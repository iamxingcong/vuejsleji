# mleji

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

<!--
该项目用的是 vue cli, 框架用的是 element ui,
用啥组件，直接 在 https://element.eleme.cn/#/zh-CN/component/installation copy 就是。

# 设置代理，解决跨域问题。

mleji\config\index.js
 proxyTable: {

      '/ops': {
        // target: 'http://dspeaklow.wangge0101.cn',
        target: 'https://dops.cmusiccopyright.com',
        // target: 'https://qiankuops.cmusiccopyright.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    },
#D:\work\backend\mleji\src  要修改的文件，基本都在这里
router, 路由配置，
config, 基本的接口配置，axios 配置

mleji\src\assets 静态文件，都在此文件夹下，js, css, image, 等

mleji\src\components 页面文件，对应的css, js,  在 mleji\src\assets文件夹下。
例如，src\components\page\music\MusicFilter.vue 页面文件，对应的js 在mleji\src\assets\js\musicfilter.js 下，

页面点击事件，比如页面MusicFilter.vue 的searchShow 点击事件，在musicfilter.js 里。

 -->
