<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>首页</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="newList.length > 0 && hotList.length > 0">
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-list v-if="newList.length > 0 && hotList.length > 0">
        <ion-list-header lines="none">
          <ion-label class="c-title">新番榜</ion-label>
          <ion-button>See All</ion-button>
        </ion-list-header>
        <item-book
          v-for="item in newList"
          :key="item.id"
          :itemData="item"
          @navBook="toBookDetail"
        ></item-book>
        <ion-list-header lines="none">
          <ion-label class="c-title">推荐榜</ion-label>
        </ion-list-header>
        <item-book
          v-for="item in topList"
          :key="item.id"
          :itemData="item"
          @navBook="toBookDetail"
        ></item-book>
        <ion-list-header lines="none">
          <ion-label class="c-title">人气榜</ion-label>
        </ion-list-header>
        <item-book
          v-for="item in hotList"
          :key="item.id"
          :itemData="item"
          @navBook="toBookDetail"
        ></item-book>
      </ion-list>

      <ion-list v-else>
        <Item-skeleton-book v-for="item in 10" :key="item"></Item-skeleton-book>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import {
    IonContent,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonListHeader,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonThumbnail,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonRefresher,
    IonRefresherContent,
    IonButton
  } from '@ionic/vue'
  import { getNewBookList, getTopList, getHotList } from '../../utils/http/api'
  import { useRouter } from 'vue-router'
  import ItemBook from './components/ItemBook.vue'
  import ItemSkeletonBook from './components/ItemSkeletonBook.vue'

  export default defineComponent({
    name: 'App',
    components: {
      IonHeader,
      IonPage,
      IonContent,
      IonTitle,
      IonToolbar,
      IonList,
      IonListHeader,
      IonItem,
      IonItemDivider,
      IonLabel,
      IonThumbnail,
      IonInfiniteScrollContent,
      IonInfiniteScroll,
      IonRefresher,
      IonRefresherContent,
      IonButton,
      ItemBook,
      ItemSkeletonBook
    },
    setup() {
      const newList = ref([])
      const topList = ref([])
      const hotList = ref([])

      const router = useRouter()

      // 跳转到漫画详情
      const toBookDetail = (obj: { id: number; book_name: string }) => {
        router.push({
          path: '/book-detail',
          query: { id: obj.id, name: obj.book_name }
        })
      }
      // 新番榜
      const queryNewBookList = async () => {
        let res = await getNewBookList()
        // console.log(res, 'res')
        if (res.data.newest.length > 0) {
          newList.value = res.data.newest
        }
      }
      // 推荐榜
      const queryTopList = async () => {
        let res = await getTopList()
        // console.log(res, '===')
        if (res.data.tops.length > 0) {
          topList.value = res.data.tops
        }
      }
      // 人气榜
      const queryHotList = async () => {
        let res = await getHotList()
        // console.log(res, 'res')
        if (res.data.hots.length > 0) {
          hotList.value = res.data.hots
        }
      }

      const doRefresh = async (event: CustomEvent) => {
        await queryNewBookList()
        await queryTopList()
        await queryHotList()
        event.target.complete()
      }

      onMounted(() => {
        queryNewBookList()
        queryTopList()
        queryHotList()
      })

      return {
        newList,
        topList,
        hotList,
        toBookDetail,
        doRefresh
      }
    }
  })
</script>

<style lang="less" scoped>
  .c-title {
    font-size: 18px;
    color: #161c41;
  }
</style>
