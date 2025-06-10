<div align="center">
  <a href="https://github.com/anncwb/vue-vben-admin">
    <img alt="VbenAdmin Logo" width="215" src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp">
  </a>
  <br>
  <br>

[![license](https://img.shields.io/github/license/anncwb/vue-vben-admin.svg)](LICENSE)

  <h1>Vue Vben Admin</h1>
</div>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=vbenjs_vue-vben-admin&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=vbenjs_vue-vben-admin) ![codeql](https://github.com/vbenjs/vue-vben-admin/actions/workflows/codeql.yml/badge.svg) ![build](https://github.com/vbenjs/vue-vben-admin/actions/workflows/build.yml/badge.svg) ![ci](https://github.com/vbenjs/vue-vben-admin/actions/workflows/ci.yml/badge.svg) ![deploy](https://github.com/vbenjs/vue-vben-admin/actions/workflows/deploy.yml/badge.svg)

**中文** | [English](./README.md) | [日本語](./README.ja-JP.md)

## 简介

Vue Vben Admin 是一个免费开源的中后台模板。使用了最新的`vue3`,`vite`,`TypeScript`等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。

此版本为最新的`5.0`版本，已使用monorepo架构重构，支持多个UI框架版本，提供更好的可维护性。

## 特性

### 核心特性

- **最新技术栈**：使用 Vue3/Vite/TypeScript 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题，多种主题色选择
- **国际化**：内置完善的国际化方案
- **权限**：内置完善的动态路由权限生成方案
- **多UI框架支持**：支持多种UI框架版本：
  - Ant Design Vue版本 (apps/web-antd)
  - Element Plus版本 (apps/web-ele)
  - Naive UI版本 (apps/web-naive)
- **Mock后端**：内置Mock后端服务 (apps/backend-mock)

### 项目结构

```bash
├── apps                    # 应用目录
│   ├── web-antd           # Ant Design Vue版本
│   ├── web-ele            # Element Plus版本
│   ├── web-naive          # Naive UI版本
│   └── backend-mock       # Mock后端服务
├── packages               # 共享包
│   ├── @core             # 核心功能
│   ├── constants         # 常量
│   ├── effects           # 效果和动画
│   ├── icons             # 图标
│   ├── locales           # 国际化
│   ├── preferences       # 用户偏好
│   ├── stores            # 状态管理
│   ├── styles            # 共享样式
│   ├── types             # TypeScript类型
│   └── utils             # 工具函数
```

## 预览

- [Vben Admin](https://vben.pro/) - 完整版中文站点

测试账号: vben/123456

<div align="center">
  <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview1.png">
  <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview2.png">
  <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview3.png">
</div>

### 使用 Gitpod

在 Gitpod（GitHub 免费在线开发环境）中打开项目，并立即开始编码.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/vbenjs/vue-vben-admin)

## 文档

[文档地址](https://doc.vben.pro/)

## 快速开始

### 环境要求

- Node.js 16+
- pnpm 8+

### 安装使用

1. 获取项目代码

```bash
git clone https://github.com/vbenjs/vue-vben-admin.git
```

2. 安装依赖

```bash
cd vue-vben-admin
npm i -g corepack
pnpm install
```

3. 运行项目

```bash
# 运行Ant Design Vue版本
pnpm dev:antd

# 运行Element Plus版本
pnpm dev:ele

# 运行Naive UI版本
pnpm dev:naive
```

4. 构建项目

```bash
# 构建所有版本
pnpm build

# 构建特定版本
pnpm build:antd
pnpm build:ele
pnpm build:naive
```

## 更新日志

[CHANGELOG](https://github.com/vbenjs/vue-vben-admin/releases)

## 项目地址

- [vue-vben-admin](https://github.com/anncwb/vue-vben-admin) - 完整版
- [vue-vben-admin-thin-next](https://github.com/anncwb/vben-admin-thin-next) - 简化版

## 如何贡献

非常欢迎你的加入！[提一个 Issue](https://github.com/anncwb/vue-vben-admin/issues/new/choose) 或者提交一个 Pull Request。

**Pull Request:**

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交`pull request`

## Git 贡献提交规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `ci` 持续集成
- `types` 类型定义文件更改

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 维护者

[@Vben](https://github.com/anncwb)

## 星星历史

[![Star History Chart](https://api.star-history.com/svg?repos=vbenjs/vue-vben-admin&type=Date)](https://star-history.com/#vbenjs/vue-vben-admin&Date)

## 捐赠

如果你觉得这个项目对你有帮助，你可以帮作者买一杯咖啡表示支持!

![donate](https://unpkg.com/@vbenjs/static-source@0.1.7/source/sponsor.png)

<a style="display: block;width: 100px;height: 50px;line-height: 50px; color: #fff;text-align: center; background: #408aed;border-radius: 4px;" href="https://www.paypal.com/paypalme/cvvben">Paypal Me</a>

## 贡献者

<a href="https://github.com/vbenjs/vue-vben-admin/graphs/contributors">
  <img alt="Contributors" src="https://opencollective.com/vbenjs/contributors.svg?button=false" />
</a>

## 交流

- [Github Discussions](https://github.com/anncwb/vue-vben-admin/discussions)

## License

[MIT © Vben-2020](./LICENSE)
