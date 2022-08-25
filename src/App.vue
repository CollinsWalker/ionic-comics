<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
  import { IonApp, IonRouterOutlet, isPlatform, useBackButton, useIonRouter } from '@ionic/vue'
  import { App } from '@capacitor/app'
  import { StatusBar, Style } from '@capacitor/status-bar'
  import { useRoute, useRouter } from 'vue-router'

  // 状态栏效果
  if (isPlatform('android')) {
    const setStatusBarStyleLight = async () => {
      // 状态栏主题
      await StatusBar.setStyle({ style: Style.Light })
      // 状态栏背景颜色
      await StatusBar.setBackgroundColor({ color: '#ffffff' })
    }
    setStatusBarStyleLight()
  }

  console.log(process.env.NODE_ENV, '当前环境')

  const ionRouter = useIonRouter()
  const router = useRouter()
  const route = useRoute()
  // 返回
  useBackButton(0, () => {
    // ionRouter.back()
    router.go(-1)
    if (route.name === 'Home') {
      App.exitApp()
    }
  })
  // 退出应用
  // useBackButton(-1, () => {
  //   if (!ionRouter.canGoBack()) {
  //     App.exitApp()
  //   }
  // })
</script>
