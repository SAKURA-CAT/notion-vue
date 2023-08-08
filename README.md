# notion-vue

notion-vue 是一个开源的模块化内容构建编辑器，它不同于传统的文本编辑器，所有的内容都是以模块的概念来打造。交互与界面样式灵感来自[Notion](https://www.notion.so)。

项目Demo地址：[https://notion-vue.vercel.app](https://notion-vue.vercel.app)

> 项目还在完善中，有问题可提[issue](https://github.com/SAKURA-CAT/notion-vue/issues)  
> 如果要了解关于本项目的更多详细内容，请[点击此处查看](https://clear-degree-730.notion.site/notion-vue-215882dc39914eaca29d7d6e1b174686?pvs=4)

## 项目来历

不知你是否有这种困惑：市面上的飞书、Notion这种可以使用类似markdown语法实现网页样式编辑的产品是怎么实现页面的渲染的？  
准确来讲，实现这种效果的技术被称为WYSIWYG——What You See Is What You Get，所见即所得。正好笔者在实际业务中碰见了类似的需求，因此对这方面做了一些研究。  

## 代码架构设计

### 开发环境与框架

本项目依赖于vue3，使用vite构建项目，使用的node与npm版本为：  
node `18.12.1`（LTS） npm `8.19.2`（默认）  

#### 依赖

项目主要依赖：

- [Vite](https://cn.vitejs.dev)：构建工具链；
- [Pinia](https://pinia.vuejs.org/zh/)：Vue项目状态管理，用于各种文本模块之间的数据共享和整体数据导出；
- [Tailwind CSS](https://tailwindcss.com)：直接在html上编写样式，使其[便于维护](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)并提升开发效率；
- [Vue Router](https://router.vuejs.org/zh/)：Vue项目路由，但这并不是必要依赖，仅仅作为页面切换工具。

额外的依赖：

- [Prettier](https://prettier.io)：代码格式化工具；
- [ESLint](https://eslint.org)：代码检查工具；
- [Babel](https://babeljs.io/docs/en/)：作用在于使编写的高版本JS能兼容低版本的浏览器环境（TODO，暂未配置）

### 运行与部署

#### 如何运行

clone本项目后，执行`npm install`来安装所有的依赖，然后执行`npm run dev`即可在本地运行本项目，为了保证项目的稳定运行，node版本请选择**18+**

#### 如何部署

### 开发工具

编辑器推荐使用 [VS Code](https://code.visualstudio.com/)，推荐安装下列插件：

- [volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)：语法提示和高亮
- [material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)：显示项目主题图标
- [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：代码格式化插件，保持代码风格一致。当然项目中使用到了 [prettier](https://prettier.io) 依赖

- [vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)：Tailwind CSS 语法高亮提示和自动补全

这些组件在 [.vscode/extensions.json](./.vscode/extensions.json) 中定义

### 代码结构介绍

### 实现块编辑

### 输出与数据保存

严格来讲本项目没有接入后端数据持久化存储，但是为了方便在实际业务中实现此效果，期望实现自下而上的JSON格式数据输出。

## 参考

1. [All-in-one](https://github.com/CedarXi/All-in-one/tree/master): 借鉴其模块化组件开发方式，但是他使用vue2+vue cli作为开发框架，存在一些性能问题和bug。
