<template>
  <ion-page>
    <ion-header class="c-header">
      <ion-toolbar class="c-toolbar">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ bookData.book_name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="chapterList.length > 0">
      <!-- 漫画信息 -->
      <div class="book-info">
        <div class="b-cover">
          <div
            class="c-cover-bg"
            :style="{
              background: bookData['cover_url'] !== '' ? 'url(' + bookData['cover_url'] + ')' : ''
            }"
          ></div>
          <ion-thumbnail class="c-thumbnail">
            <ion-img :src="bookData['cover_url']"></ion-img>
          </ion-thumbnail>
          <!-- 收藏按钮 -->
          <ion-fab class="c-fab" @click="switchFavor" v-if="isLogin">
            <ion-fab-button :color="isfavor === 1 ? 'danger' : ''">
              <ion-icon :icon="isfavor === 0 ? heartOutline : heart"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </div>
        <div class="b-info">
          <h2 class="b-title">{{ bookData['book_name'] }}</h2>
          <p class="b-author">{{ bookData['author_name'] }}</p>
          <p class="b-desc">{{ bookData['summary'] }}</p>
        </div>
      </div>
      <!-- 章节列表 -->
      <div class="book-chapter">
        <h2>章节列表</h2>
        <ion-list v-if="chapterList.length > 0">
          <ion-item
            v-for="item in chapterList"
            :key="item['id']"
            button
            @click="toChapterDetail(item)"
          >
            <ion-label> {{ item['chapter_name'] }} </ion-label>
          </ion-item>
        </ion-list>
        <ion-list v-else>
          <ItemSkeletonText v-for="(st, idx) in 10" :key="idx" />
        </ion-list>
      </div>
    </ion-content>
    <!-- <ion-footer class="ion-no-border c-footer">
      <ion-button color="light">章节列表</ion-button>
      <ion-button color="primary" @click="toChapterDetail(item)">开始阅读</ion-button>
    </ion-footer> -->
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import {
    IonPage,
    IonHeader,
    IonContent,
    IonButton,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonList,
    onIonViewDidEnter,
    onIonViewWillEnter,
    IonFab,
    IonFabButton,
    IonIcon,
    toastController,
    alertController
  } from '@ionic/vue'
  import { useRoute, useRouter } from 'vue-router'
  import { heartOutline, heart } from 'ionicons/icons'
  import { getBookDetail, getChapterList, getIsFavor, getSwitchFavor } from '@/utils/http/api'
  import ItemSkeletonText from '@/components/ItemSkeletonText.vue'
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
      IonThumbnail,
      IonImg,
      IonLabel,
      IonList,
      ItemSkeletonText,
      IonFab,
      IonFabButton,
      IonIcon
    },
    setup() {
      const route = useRoute()
      const router = useRouter()

      const bookData = ref({})
      const chapterList = ref([])
      const isfavor = ref(0) // 当前用户是否收藏，1为已收藏
      const isLogin = ref(false)

      onIonViewWillEnter(() => {
        let utoken = storage.get('utoken') || ''
        queryBookDetail()
        queryChapterList()
        // 如果用户没有登录则不调用查询是否收藏接口
        if (utoken) queryIsFavor()
        isLogin.value = utoken ? true : false
      })

      const queryBookDetail = async () => {
        let params = {
          id: route.query.id // 漫画id
        }
        let res = await getBookDetail(params)
        if (res.data.book) {
          bookData.value = res.data.book
        }
      }

      const queryIsFavor = async () => {
        let params = {
          id: route.query.id // 漫画id
        }
        let res = await getIsFavor(params)
        if (res.data.success === 1) {
          isfavor.value = res.data.isfavor
        } else {
          isfavor.value = 0
        }
      }

      const switchFavor = async () => {
        let params = {
          id: route.query.id // 漫画id
        }
        let res = await getSwitchFavor(params)
        console.log(res, '===')
        if (res.data.success === 1) {
          isfavor.value = res.data.isfavor
        } else {
          if (res.data.codeAuth === -1) {
            presentAlert()
          }
          isfavor.value = 0
        }
      }

      const queryChapterList = async () => {
        let params = {
          book_id: route.query.id // 漫画id
        }
        let res = await getChapterList(params)
        // console.log(res)
        if (res.data.chapters) {
          chapterList.value = res.data.chapters
        }
      }

      const toChapterDetail = (obj: { id: number; chapter_name: string }) => {
        router.push({
          path: '/chapter-detail',
          query: { id: obj.id, name: obj.chapter_name }
        })
      }

      const presentAlert = async () => {
        const alert = await alertController.create({
          header: '身份已过期或者没有登录，请登录',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {}
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: () => {
                router.replace('/login')
              }
            }
          ]
        })

        await alert.present()
      }

      // 消息弹窗
      const toastShow = async (message: string) => {
        const toast = await toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        })
        return toast.present()
      }

      return {
        route,
        bookData,
        isfavor,
        chapterList,
        toChapterDetail,
        heartOutline,
        heart,
        switchFavor,
        isLogin
      }
    }
  })
</script>

<style lang="less" scoped>
  .book-info {
    .b-cover {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 50px 0;
      position: relative;
      .c-cover-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat !important;
        background-size: 100% !important;
        z-index: -1;
        filter: blur(18px);
      }
      .c-thumbnail {
        height: 160px;
        width: 120px;
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
          0 1px 18px 0 rgba(0, 0, 0, 0.12);
        // border-radius: 0 6px 6px 0;
        overflow: hidden;
      }
      .c-fab {
        position: absolute;
        right: 10px;
        bottom: -40px;
      }
    }
    .b-info {
      margin-left: 12px;
      .b-title {
        font-size: 18px;
        color: #161c41;
      }
      .b-author {
        font-size: 12px;
      }
      .b-desc {
        font-size: 12px;
      }
    }
  }
  .c-footer {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
  }
</style>
