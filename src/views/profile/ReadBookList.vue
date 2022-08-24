<template>
  <div class="container">
    <p v-if="!isLogin" class="empty"
      >没有登录，<span class="btn" @click="toLogin">点击登录</span>
    </p>
    <ion-row class="c-row" v-else-if="bookList.length > 0">
      <ion-col class="c-col" size="4" v-for="book in bookList" :key="book.id">
        <item-book :itemData="book" @navBook="toBookDetail"></item-book>
      </ion-col>
    </ion-row>
    <p class="empty" v-else> 暂无内容 </p>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { IonList, IonItem, IonRow, IonCol } from '@ionic/vue'
  import { getBookShelf } from '@/utils/http/api'
  import { useRouter } from 'vue-router'
  import { storage } from '@/utils/storage'
  import ItemBook from './ItemBook.vue'

  export default defineComponent({
    name: 'ProfilePage',
    components: {
      IonList,
      IonItem,
      IonRow,
      IonCol,
      ItemBook
    },
    setup() {
      onMounted(() => {
        initData()
      })

      const router = useRouter()
      const bookList = ref([])
      const isLogin = ref(false)

      const initData = async () => {
        let utoken = storage.get('utoken')
        if (utoken) {
          isLogin.value = true
          queryBookShelf()
        } else {
          isLogin.value = false
        }
      }

      const queryBookShelf = async () => {
        let res = await getBookShelf()
        console.log(res, 'res')
        if (res.data.success === 1 && res.data.favors.length > 0) {
          bookList.value = res.data.favors
        } else {
          bookList.value = []
        }
      }

      // 跳转到漫画详情
      const toBookDetail = (obj: { book_id: number }) => {
        router.push({
          path: '/book-detail',
          query: { id: obj.book_id }
        })
      }

      const toLogin = () => {
        router.replace('/login')
      }

      return {
        bookList,
        isLogin,
        toLogin,
        toBookDetail
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
    .c-row {
      flex: 1;
      height: 100%;
    }
    .btn {
      color: #3880ff;
    }
  }
</style>
