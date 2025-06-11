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

**English** | [中文](./README.zh-CN.md) | [日本語](./README.ja-JP.md)

## Introduction

Vue Vben Admin is a free and open source middle and back-end template. Using the latest `Vue3`, `Vite`, `TypeScript` and other mainstream technology development, the out-of-the-box middle and back-end front-end solutions can also be used for learning reference.

This version is the latest `5.0` version, which has been refactored with a monorepo architecture to support multiple UI framework versions and better maintainability.

## Features

### Core Features

- **Latest Technology Stack**: Developed with Vue3, Vite, TypeScript, and other cutting-edge frontend technologies
- **TypeScript**: Application-level JavaScript language
- **Theming**: Multiple theme colors available with custom theme configuration
- **Internationalization**: Built-in comprehensive internationalization solution
- **Permission Control**: Built-in complete dynamic routing permission generation scheme
- **Multiple UI Frameworks**: Support for multiple UI framework versions:
  - Ant Design Vue version (apps/web-antd)
  - Element Plus version (apps/web-ele)
  - Naive UI version (apps/web-naive)
- **Mock Backend**: Built-in mock backend service (apps/backend-mock)

### Project Structure

```bash
├── apps                    # Application directory
│   ├── web-antd           # Ant Design Vue version
│   ├── web-ele            # Element Plus version
│   ├── web-naive          # Naive UI version
│   └── backend-mock       # Mock backend service
├── packages               # Shared packages
│   ├── @core             # Core functionality
│   ├── constants         # Constants
│   ├── effects           # Effects and animations
│   ├── icons             # Icons
│   ├── locales           # Internationalization
│   ├── preferences       # User preferences
│   ├── stores            # State management
│   ├── styles            # Shared styles
│   ├── types             # TypeScript types
│   └── utils             # Utility functions
```

## Preview

- [Vben Admin](https://vben.pro/) - Full version Chinese site

Test account: vben/123456

<div align="center">
  <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview1.png">
  <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview2.png">
  <img alt="VbenAdmin Logo" width="100%" src="https://anncwb.github.io/anncwb/images/preview3.png">
</div>

### Use Gitpod

Open the project in Gitpod (free online dev environment for GitHub) and start coding immediately.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/vbenjs/vue-vben-admin)

## Documentation

[Documentation](https://doc.vben.pro/)

## Quick Start

### Prerequisites

- Node.js 16+
- pnpm 8+

### Installation

1. Get the project code

```bash
git clone https://github.com/vbenjs/vue-vben-admin.git
```

2. Install dependencies

```bash
cd vue-vben-admin
npm i -g corepack
pnpm install
```

3. Run the project

```bash
# Run Ant Design Vue version
pnpm dev:antd

# Run Element Plus version
pnpm dev:ele

# Run Naive UI version
pnpm dev:naive
```

4. Build the project

```bash
# Build all versions
pnpm build

# Build specific version
pnpm build:antd
pnpm build:ele
pnpm build:naive
```

## Changelog

[CHANGELOG](https://github.com/vbenjs/vue-vben-admin/releases)

## Contributing

Your contributions are always welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) first.

### Pull Request Guidelines

1. Fork code!
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat(function): add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. Submit a `pull request`

## Git Contribution submission specification

Reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `feat` Add new features
- `fix` Fix the problem/BUG
- `style` The code style is related and does not affect the running result
- `perf` Optimization/performance improvement
- `refactor` Refactor
- `revert` Undo edit
- `test` Test related
- `docs` Documentation/notes
- `chore` Dependency update/scaffolding configuration modification etc.
- `ci` Continuous integration
- `types` Type definition file changes

## Browser Support

Modern browsers and Internet Explorer 11+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: |
| last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Maintainer

[@Vben](https://github.com/anncwb)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=vbenjs/vue-vben-admin&type=Date)](https://star-history.com/#vbenjs/vue-vben-admin&Date)

## Donate

If you find this project useful, you can buy author a glass of juice 🍹

![donate](https://unpkg.com/@vbenjs/static-source@0.1.7/source/sponsor.png)

<a style="display: block;width: 100px;height: 50px;line-height: 50px; color: #fff;text-align: center; background: #408aed;border-radius: 4px;" href="https://www.paypal.com/paypalme/cvvben">Paypal Me</a>

## Contributors

<a href="https://github.com/vbenjs/vue-vben-admin/graphs/contributors">
  <img alt="Contributors" src="https://opencollective.com/vbenjs/contributors.svg?button=false" />
</a>

## Discord

- [Github Discussions](https://github.com/anncwb/vue-vben-admin/discussions)

## License

[MIT © lintg@2025](./LICENSE)
