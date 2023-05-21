# 使用antd class 的组件库 配合 storybook 的说明文档

使用 Ant Design 组件库和 Storybook 说明文档，快速构建美观易用的 Web 应用程序

## 开始

### vite创建项目
  
```bash
pnpm create vite antd-k --template react-ts # react-ts 模版 快速开发
```

### 增加sass支持

```bash
pnpm add -D sass
```

### ts中 satisfies

ts satisfies 是 TypeScript 中的一个类型判断函数，用于判断一个类型是否满足另一个类型的要求。它的语法为：

```typescript
satisfies<T>(type: Type<T>, value: unknown): value is T
```

其中，type 参数表示要判断的类型，value 参数表示要判断的值。如果 value 符合 type 的要求，则返回 true，否则返回 false。

ts satisfies 主要用于类型保护，可以在编译时检查类型是否符合要求，避免在运行时出现类型错误。它可以与其他 TypeScript 类型判断函数一起使用，例如 typeof、instanceof 等，来实现更精确的类型判断。

需要注意的是，ts satisfies 只能判断类型是否符合要求，不能判断值是否符合要求。因此，在使用时需要结合其他类型判断函数来进行综合判断。同时，ts satisfies 也只能判断静态类型，不能判断动态类型，因此需要谨慎使用，避免出现类型错误。
