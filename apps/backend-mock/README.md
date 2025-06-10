# @vben/backend-mock

## Description

Vben Admin 数据 mock 服务，没有对接任何的数据库，所有数据都是模拟的，用于前端开发时提供数据支持。线上环境不再提供 mock 集成，可自行部署服务或者对接真实数据，由于 `mock.js` 等工具有一些限制，比如上传文件不行、无法模拟复杂的逻辑等，所以这里使用了真实的后端服务来实现。唯一麻烦的是本地需要同时启动后端服务和前端服务，但是这样可以更好的模拟真实环境。该服务不需要手动启动，已经集成在 vite 插件内，随应用一起启用。

## Features

- 完整的RESTful API模拟
- 支持GET/POST/PUT/DELETE等HTTP方法
- 文件上传模拟支持
- 自定义响应延迟设置
- 动态数据生成
- 集成错误模拟（可配置错误码和错误信息）
- 与前端开发服务器无缝集成

## Project Structure

```
├── api/ - API路由定义
├── routes/ - 路由配置
├── middleware/ - 中间件
├── utils/ - 工具函数
├── .env - 环境变量配置
├── error.ts - 错误处理
├── nitro.config.ts - Nitro服务器配置
├── package.json - 项目依赖和脚本
```

## Running the app

```bash
# development
$ pnpm run start

# production mode
$ pnpm run build
```
