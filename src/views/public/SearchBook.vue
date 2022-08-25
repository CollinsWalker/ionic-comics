<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>搜素</ion-title>
      </ion-toolbar>
      <ion-searchbar v-model="searchText" :debounce="500"></ion-searchbar>
    </ion-header>
    <ion-content>
      <ion-row v-if="bookList.length > 0">
        <ion-col class="c-col" size="4" v-for="book in bookList" :key="book.id">
          <item-book :itemData="book" @navBook="toBookDetail"></item-book>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import {
    IonContent,
    IonButton,
    IonButtons,
    IonBackButton,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    IonRow,
    IonCol
  } from '@ionic/vue'
  import { getSearch } from '@/utils/http/api'
  import ItemBook from '../explore/components/ItemBook.vue'
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
      IonSearchbar,
      IonRow,
      IonCol,
      ItemBook
    },
    setup() {
      const searchText = ref()
      const bookList = ref([])
      const router = useRouter()

      watch(
        () => searchText.value,
        (val, preVal) => {
          //val为修改后的值,preVal为修改前的值
          console.log('message', val, preVal)
          if (val) querySearch(val)
        }
      )

      const querySearch = async (keyword: string) => {
        let params = {
          num: 12,
          keyword // 搜索关键字
        }
        let res = await getSearch(params)
        if (res.data.success === 1 && res.data.count > 0) {
          console.log(res, '===')
          bookList.value = res.data.books
        } else {
          bookList.value = []
        }
      }

      // 跳转到漫画详情
      const toBookDetail = (obj: { id: number; book_name: string }) => {
        router.push({
          path: '/book-detail',
          query: { id: obj.id, name: obj.book_name }
        })
      }

      return {
        searchText,
        bookList,
        toBookDetail
      }
    }
  })
</script>

<style lang="less" scoped>
  ion-header {
    background-color: #ffffff;
  }
  ion-searchbar {
    --box-shadow: none;
  }
</style>
