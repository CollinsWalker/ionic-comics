<template>
  <div class="container">
    <p v-if="isLogin" class="empty"
      >没有登录，<span class="btn" @click="toLogin">点击登录</span>
    </p>
    <ion-list v-else> sdads </ion-list>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { IonList, IonItem } from '@ionic/vue'
  import { getBookShelf } from '@/utils/http/api'
  import { useRouter } from 'vue-router'
  import { storage } from '@/utils/storage'

  export default defineComponent({
    name: 'ProfilePage',
    components: {
      IonList,
      IonItem
    },
    setup() {
      onMounted(() => {
        initData()
        queryBookShelf()
      })

      const router = useRouter()
      const list = ref()
      const isLogin = ref(false)

      const initData = async () => {
        let utoken = storage.get('utoken')
        if (!utoken) isLogin.value = true
      }

      const queryBookShelf = async () => {
        let res = await getBookShelf()
        console.log(res, 'res')
      }

      const toLogin = () => {
        router.push('/login')
      }

      return {
        list,
        isLogin,
        toLogin
      }
    }
  })
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      color: #3880ff;
    }
  }
</style>
