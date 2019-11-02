# 模范秀 - 小程序

## 快速开始

```shell
npm install
npm run build

# OR 你使用的是 yarn (推荐）

yarn install
yarn build
```

使用微信开发者工具，导入根目录下的 `dist` 文件夹即可预览。

## 项目结构

### 目录结构

项目源码位于 `src` 目录下，入口文件为 `app.js`

<pre>
    <code>
├── api                      API 目录
├── app.js                   小程序入口文件
├── app.json                 小程序配置文件
├── app.scss                 小程序全局样式文件
├── assets                   静态资源目录
│   ├── images               静态资源/公共图片目录
│   ├── styles               静态资源/公共样式目录
│   └── wxs                  静态资源/公共脚本目录
├── components               公共组件目录
├── libs                     第三方依赖库
├── packages                 分包目录
├── pages                    页面目录
│   └── index                index 页面目录
│       ├── list-item        与 index 页面强关联的组件目录
│       ├── assets           与 index 页面强关联的静态资源目录
│       ├── index.js         index 页面入口文件
│       ├── index.json       index 页面配置文件
│       ├── index.wxss       index 页面样式文件
│       └── index.wxml       index 页面 wxml 文件
├── project.config.json      小程序项目环境配置文件
├── sitemap.json             sitemap 文件
└── utils                    公共方法库
    </code>
</pre>

### 文件命名规范

1. 普通文件均为小写字母命名，多单词采用 **下划线** 连接
2. 定义类或构造函数的文件以大写字母开头（如 `User`）
3. 组件文件多单词采用 **连字符** 连接

## 代码规范

### JavaScript 书写规范

参考：[Taro JavaScript 书写规范](https://taro-docs.jd.com/taro/docs/spec-for-taro.html#javascript-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)，建议阅读时间：15 min

> 注意：本项目字符串统一使用双引号，而非推荐中的单引号！

### Prettier

项目采用 _prettier_ 格式化工具，具体配置可查看根目录下的 `.prettierrc` 文件。

> 注意：虽然目前没有采用 git-hook 等强制工具，但还是希望大家养成先 format 再 commit 的好习惯

### ESLint

由于目前项目存在老代码尚未更新问题，所以并没有将 Lint 工具加入全局代码的构建过程。需要针对性使用 Lint 工具的同学，可通过 CLI 检测对应的文件。

## 注意事项

- 该项目运行 `npm run build` 构建时是主包分包一起构建的，所有的公共代码包都默认放在 `dist` 目录下（比如 `common.js`、`common_IM.js` 等），自主开发的 `moveFilesPlugin.js` 插件会将属于各个分包的公共代码包移动到各自的分包目录下（比如将 `common_IM.js` 移动到 `IM` 目录下），以保证代码正确运行

- 如果需要添加更多的分包，则在 `src/packages` 目录下添加即可，目录结构参照 `IM` 分包目录结构，并在 `app.json` 中做相应配置

- 如果在项目中用到 `input` 组件时，不能写成 `<input></input>`，而要写成 `<input />`，因为前一种写法经过 `webpack` 压缩之后会报错

- `plugins` 目录下放的是自主开发的 `webpack` 插件
