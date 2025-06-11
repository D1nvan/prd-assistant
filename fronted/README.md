# AI产品经理助手前端

AI产品经理助手是一个帮助产品经理收集、整理和分析产品需求的系统。本项目是该系统的前端部分，采用React + Ant Design构建。

## 技术栈

- React 18
- Ant Design 5.x
- Styled Components
- Axios

## 项目结构

```
fronted/
  ├── public/                 # 静态资源
  ├── src/                    # 源代码
  │   ├── api/                # API接口
  │   ├── components/         # 通用组件
  │   ├── pages/              # 页面组件
  │   ├── styles/             # 全局样式
  │   ├── App.js              # 应用入口
  │   └── index.js            # 渲染入口
  ├── package.json            # 依赖配置
  └── README.md               # 项目说明
```

## 开发指南

### 安装依赖

```
npm install
```

### 启动开发服务器

```
npm start
```

### 构建生产环境版本

```
npm run build
```

## 页面介绍

### 任务管理页面

- 左侧边栏显示任务列表，点击任务后会在第二栏显示该任务的计划列表
- 选择计划后，右侧区域显示计划详情
- 顶部导航栏提供"创建任务"功能

## API接口

系统与后端的交互通过`src/api/taskService.js`中定义的接口进行。主要包括：

- 创建任务
- 获取任务列表
- 获取任务详情
- 获取计划列表
- 获取计划详情

## 特色

- 采用科幻风格的UI设计
- 丰富的动效和交互体验
- 响应式布局，适配不同屏幕尺寸 