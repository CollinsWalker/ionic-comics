<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>天空漫画 - 注册</ion-title>
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
      <ion-item>
        <ion-label position="floating">推荐人(非必填)</ion-label>
        <ion-input v-model="userInfo.pid"></ion-input>
      </ion-item>
      <ion-button expand="block" class="btn-login" @click="onRegister">注册</ion-button>
      <ion-button expand="block" class="btn-login" href="/login">登录</ion-button>
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
  import { registerUser } from '@/utils/http/api'
  import { useRouter } from 'vue-router'

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
        password: '', // 密码
        pid: '' // 推荐人id（可为空）
      })

      const router = useRouter()

      const onRegister = async () => {
        console.log(userInfo.value, '===')
        let res = await registerUser(userInfo.value)
        console.log(res, '===')
        if (res.data.success === 1) {
          toastShow('注册成功', 'success')
          router.push('/login')
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
        onRegister
      }
    }
  })
</script>

<style lang="less" scoped>
  .btn-login {
    margin-top: 50px;
  }
</style>
