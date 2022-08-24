# Vue 3 + TypeScript + Vite + Ionic

**确保电脑有 nodejs 和 java 环境**

java 环境建议百度: "cordova 打包环境配置"

在项目根目录添加三个文件: .env, .env.development, .env.production, 填入内容

```
VITE_APP_URL=域名/app.php
VITE_APP_KEY=app密钥
```

修改 capacitor.config.ts 文件里的内容

```
...
appId: 'applicationId',
appName: 'App名称',
...
```

目前仅支持打包: Android ~~IOS~~

### 安装依赖

```
npm install
```

运行命令

```
npm run dev
```

### 打包命令

如果目录没有'android'目录，请在根目录终端使用

```
npx cap add android
```

使用 Android Studio 打包命令，**推荐**

```
npm run build:android
```

没有 AS 打包命令(需要提前申请好密钥，签名 App 需要)使用此命令会自动签名 App，需要把密钥放到"android"目录。这个会导致 Android 版本高出现解析包错误，自测

```
npm run android:release
```

如果打包界面有问题可以选择，此命令打包成debug版本
```
npm run build:sit
```