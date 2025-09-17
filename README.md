# Next.js SSR 项目

这是一个使用 Next.js 14、React 18 和 TypeScript 构建的服务端渲染项目。

## 功能特性

- ⚡ **服务端渲染 (SSR)** - 更好的 SEO 和首屏加载性能
- 🔧 **TypeScript** - 完整的类型安全支持
- 📦 **Next.js 14** - 最新的 Next.js 特性和优化
- 🎯 **ESLint** - 代码质量检查
- 🚀 **现代化工具链** - 开箱即用的开发体验

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm run start
```

## 项目结构

```
├── src/
│   └── app/
│       ├── layout.tsx    # 根布局组件
│       └── page.tsx      # 首页组件
├── public/               # 静态资源文件
├── next.config.js        # Next.js 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目依赖和脚本
```

## 开发说明

- 使用 `src/app` 目录结构（Next.js 13+ App Router）
- 支持 TypeScript 和 JSX
- 集成 ESLint 进行代码规范检查
- 支持模块路径别名 `@/*` 指向 `src/*`

## 了解更多

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://reactjs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)