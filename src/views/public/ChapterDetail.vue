<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>{{ chapterName || route.query.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="c-content" :scroll-y="true">
      <ion-list class="c-list">
        <ion-item v-for="item in chapterPicList" :key="item.id" lines="none">
          <ion-thumbnail class="c-thumbnail">
            <ion-img :src="item.img_url" alt="暂无图片"></ion-img>
          </ion-thumbnail>
        </ion-item>
      </ion-list>
      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="加载数据...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
      <div class="c-btn">
        <ion-button color="primary" @click="onChangeChapter('prev')" v-if="prev !== -1"
          >上一章</ion-button
        >
        <ion-button color="primary" @click="onChangeChapter('next')" v-if="next !== -1"
          >下一章</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonList,
    IonItem,
    IonThumbnail,
    IonImg,
    InfiniteScrollCustomEvent,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  } from '@ionic/vue'
  import { useRoute } from 'vue-router'
  import { getChapterDetail } from '@/utils/http/api'
  // import ItemImage from '@/components/ItemImage.vue'

  export default defineComponent({
    name: 'ChapterDetail',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonButtons,
      IonBackButton,
      IonTitle,
      IonContent,
      IonButton,
      IonList,
      IonItem,
      IonThumbnail,
      IonImg,
      IonInfiniteScroll,
      IonInfiniteScrollContent
      // ItemImage
    },
    setup() {
      const route = useRoute()

      const chapterPicList = ref() // 章节图片
      const chapterId = ref() // 章节id
      const chapterName = ref() // 章节信息
      const next = ref()
      const prev = ref()

      const pageNum = ref(0)
      const pageSize = ref(3)
      const totalPage = ref(0)
      const total = ref(0)
      const isDisabled = ref(false)
      const isFirst = ref(true)
      const pics = ref()

      onMounted(() => {
        querygetChapterDetail()
      })

      const querygetChapterDetail = async () => {
        let params = {
          id: chapterId.value || route.query.id // 章节id
        }
        let res = await getChapterDetail(params)
        if (res.data.pics.length > 0) {
          chapterName.value = res.data.chapter.chapter_name
          next.value = res.data.next || -1
          prev.value = res.data.prev || -1
          let list = res.data.pics.reverse()
          pics.value = list
          totalPage.value = Math.ceil(list.length / pageSize.value) || 1
          console.log(pics.value, '===', pics.value.length)
          chapterPicList.value = list.splice(pageNum.value, pageSize.value)
        }
      }

      const onChangeChapter = (type: string) => {
        document.documentElement.scrollTop = 0
        chapterId.value = type === 'next' ? next.value : prev.value
        querygetChapterDetail()
      }

      const dealData = (data: any) => {
        console.log(pics.value, '===')
        let list = data.splice(pageNum.value, pageSize.value)
        chapterPicList.value = chapterPicList.value.concat(list)
        console.log(chapterPicList.value, '===')
      }

      const loadData = async (ev: InfiniteScrollCustomEvent) => {
        pageNum.value = pageNum.value += pageSize.value
        console.log(pageNum.value, 'pageNum')
        // isFirst.value = false
        dealData(pics.value)

        ev.target.complete()

        if (pageNum.value >= totalPage.value) {
          ev.target.disabled = true
        }
      }

      return {
        route,
        chapterPicList,
        onChangeChapter,
        chapterName,
        next,
        prev,
        isDisabled,
        loadData
      }
    }
  })
</script>

<style lang="less" scoped>
  ion-item {
    --padding-start: 0;
    --inner-padding-end: 0;
  }
  .c-content {
    .c-thumbnail {
      height: 100%;
      width: 100%;
    }
  }
  .c-btn {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
  }
  .c-list {
    padding: 0;
  }
</style>
