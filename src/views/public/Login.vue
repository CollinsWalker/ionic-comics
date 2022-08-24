<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>天空漫画 - 登录</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-label position="floating">用户名</ion-label>
        <ion-input v-model="userInfo.username"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">密码</ion-label>
        <ion-input v-model="userInfo.password" type="password"></ion-input>
      </ion-item>
      <ion-button expand="block" class="btn-login" @click="onLogin">登录</ion-button>
      <ion-button expand="block" class="btn-login" href="/register">注册</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import {
    IonContent,
    IonButton,
    IonButtons,
    IonBackButton,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonLabel,
    toastController
  } from '@ionic/vue'
  import { useRouter } from 'vue-router'
  import { loginUser } from '@/utils/http/api'
  import { storage } from '@/utils/storage'

  export default defineComponent({
    name: 'About',
    components: {
      IonHeader,
      IonPage,
      IonButton,
      IonButtons,
      IonBackButton,
      IonContent,
      IonTitle,
      IonToolbar,
      IonItem,
      IonInput,
      IonLabel
    },
    setup() {
      const userInfo = ref({
        username: '', // 用户名
        password: '' // 密码
      })

      const router = useRouter()

      const onLogin = async () => {
        let res = await loginUser(userInfo.value)
        if (res.data.success === 1) {
          toastShow('登录成功', 'success')
          delete res.data.userInfo.password // 保存的数据去除密码
          storage.set('userInfo', res.data.userInfo)
          storage.set('utoken', res.data.userInfo.utoken)
          router.replace('/profile')
        } else {
          toastShow(res.data.msg, 'danger')
        }
      }

      // 消息弹窗
      const toastShow = async (message: string, color: string) => {
        const toast = await toastController.create({
          message,
          duration: 3000,
          color,
          position: 'bottom'
        })
        return toast.present()
      }

      return {
        userInfo,
        onLogin
      }
    }
  })
</script>

<style lang="less" scoped>
  .btn-login {
    margin-top: 50px;
  }
</style>
