# react-ts-parcel-cli
React + typescript + parcel 脚手架，支持“应用开发”和“组件开发”两种模式

### 使用

    $ npm install -g react-ts-parcel-cli
    
    $ cd 本地目录
    
    $ react-ts-parcel init 项目名称
    
### 分为“应用开发”和“组件开发”

#### 1. 应用开发

下载的模版

    https://github.com/ZJBC/react-ts-parcel-template-app
    
生成的目录：

```
--- public
  |
  | --- index.html 打包html入口
  |
--- src
  |
  | --- index.tsx js入口
  | --- style.scss css入口
  |
```

#### 2. 组件开发

下载的模版

    https://github.com/ZJBC/react-ts-parcel-template-component
    
生成的目录：

```
--- example
  |
  | --- index.html 'npm start'的html入口
  | --- index.html 'npm start'的入口
  |
--- src
  |
  | --- index.tsx 'npm build'的js入口
  | --- style.scss css入口
  |
```
