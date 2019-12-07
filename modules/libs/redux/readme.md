# redux

### 介绍

`redux` 用于状态管理。

## 目录结构

```js
.
├── connect.js
├── createStore.js
├── index.js
├── provider.js
├── readme.md
├── reducers                          // 所有的 reducers，现已归属到各个项目的 redux 目录下，每个项目维护各自的 reducers 和 store
│   ├── index.js
│   ├── mainPackage                   // 主包的 reducers
│   │   ├── article.js                // 主包中 article 页面的 reducers
│   │   ├── common.js                 // 主包中针对公共 state 的 reducers
│   │   ├── index.js
│   │   └── video.js                  // 主包中 video 页面的 reducers
│   └── subPackages                   // 分包的 reducers
│       └── IM                        // IM 分包的 reducers
│           ├── dealGroupMsg.js
│           └── index.js
├── store                             // 所有的 state，现已归属到各个项目的 redux 目录下，每个项目维护各自的 reducers 和 store
│   ├── index.js
│   ├── mainPackage                   // 主包的 state
│   │   ├── article.js                // 主包中 article 页面的 state
│   │   ├── common.js                 // 主包中公共的 state
│   │   ├── index.js
│   │   └── video.js                  // 主包中 video 页面的 state
│   └── subPackages                   // 分包的 state
│       └── IM                        // IM 分包的 state
│           └── index.js
├── util.js
└── wrapActionCreators.js
```

## 使用方法

```js
// app.js
import WeAppRedux from "libs/redux/index.js"
import createStore from "libs/redux/createStore.js"
import reducer from "@/redux/reducers/index.js"
import ENVIRONMENT_CONFIG from "libs/redux/config/envConfig.js"

const { Provider } = WeAppRedux
const store = createStore(reducer)

App(
  Provider(store)({
    onLaunch() {},
    onShow() {},
    onHide() {},
    globalData: {
      ENVIRONMENT_CONFIG,
      token: ""
    }
  })
)
```

### 应用于页面

```js
import { connect } from "@/libs/redux/index.js"
const app = getApp()
const store = app.store

let pageConfig = {

  data: {
    testData: 0
  },

  // 这里可以对 data 里的数据项进行 watch
  watch: {
    testData(newVal, oldVal){}
  },

  onLoad: function (options) {
  },
}

// 这里将 store 里的 items 映射到页面的 data.items
const mapStateToData = state => ({ items: state.MAIN.VIDEO.videoItems })
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(pageConfig)

Page(connectedConfig)
```

### 应用于组件

```js
import { connect } from "@/libs/redux/index.js"
const app = getApp()
const store = app.store

let componentConfig = {
  options: {
    // 允许页面的样式影响到组件
    styleIsolation: 'apply-shared'
  },
  
  properties: {

  },

  data: {
    testData: 0,

    // 这里可以对 data 里的数据项进行 watch，注意这里的 watch 是作为 data 的一个属性存在的，这是和页面中写法不同的地方
    watch: {
      testData(newVal, oldVal){}
    },
  },

  methods: {

  }
}

const mapStateToData = state => ({})
const mapDispatchToPage = dispatch => ({})

let connectedConfig = connect(
  mapStateToData,
  mapDispatchToPage
)(componentConfig, true)    // 组件中，这里需要给第二个参数传一个 true

Component(connectedConfig)
```

### 详细用法可参考其他页面
