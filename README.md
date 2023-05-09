# 开发过程记录

## 一、项目初始化

```shell
npm init -y 
```

## 二、安装express@4.17.1

```shell
npm i express@4.17.1
```

## 三、安装cors@2.8.5

```shell
npm i cors@2.8.5
```

## 四、安装typescript、ts-node @types/node

```shell
npm install typescript ts-node @types/node --save-dev
```

## 五、初始化TypeScript

```shell
npx tsc --init
```

## 六、安装Prisma CLI

```shell
npm install prisma --save-dev
```

## 七、用Prisma CLI的init命令设置Prisma

```shell
npx prisma init --datasource-provider mysql
```

## 八、安装运行迁移，用Prisma Migrate创建你的数据库表

```shell
npx prisma migrate dev --name init
```

## 九、创建script.ts

```shell
touch script.ts
```

## 十、安装@prisma/client

```shell
npm i @prisma/client 
```

## 十一、安装bcryptjs@2.4.3

```shell
npm i bcryptjs@2.4.3
```

