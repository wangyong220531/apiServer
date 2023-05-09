# 开发过程记录

## 一、项目初始化

```shell
npm init -y 
```

## 安装express@4.17.1

```shell
npm i express@4.17.1
```

## 安装cors@2.8.5

```shell
npm i cors@2.8.5
```

## 安装typescript、ts-node @types/node

```shell
npm install typescript ts-node @types/node --save-dev
```

## 初始化TypeScript

```shell
npx tsc --init
```

## 安装Prisma CLI

```shell
npm install prisma --save-dev
```

## 用Prisma CLI的init命令设置Prisma

```shell
npx prisma init --datasource-provider mysql
```

## 安装运行迁移，用Prisma Migrate创建你的数据库表

```shell
npx prisma migrate dev --name init
```

## 创建script.ts

```shell
touch script.ts
```

## 安装@prisma/client

```shell
npm i @prisma/client 
```
