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
    <ion-content class="c-content">
      <ion-list class="c-list">
        <ion-item v-for="item in chapterPicList" :key="item.id" lines="none">
          <ion-thumbnail class="c-thumbnail">
            <ion-img :src="item.img_url" alt="暂无图片" @ionImgDidLoad="onLoadPicture"></ion-img>
          </ion-thumbnail>
        </ion-item>
      </ion-list>
      <!-- <div class="c-pic">
        <div v-for="item in chapterPicList" :key="item.id">
          <ion-thumbnail class="c-thumbnail">
            <ion-img :src="item.img_url" alt="暂无图片" @ionImgDidLoad="onLoadPicture"></ion-img>
          </ion-thumbnail>
        </div>
      </div> -->
    </ion-content>
    <div class="c-btn">
      <ion-button color="primary" @click="onChangeChapter('prev')" v-if="prev !== -1"
        >上一章</ion-button
      >
      <ion-button color="primary" @click="onChangeChapter('next')" v-if="next !== -1"
        >下一章</ion-button
      >
    </div>
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
    IonImg
  } from '@ionic/vue'
  import { useRoute } from 'vue-router'
  import { getChapterDetail } from '@/utils/http/api'

  export default defineComponent({
    name: 'About',
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
      IonImg
    },
    setup() {
      const route = useRoute()

      const chapterPicList = ref() // 章节图片
      const chapterId = ref() // 章节id
      const chapterName = ref() // 章节信息
      const next = ref()
      const prev = ref()

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
          chapterPicList.value = res.data.pics.reverse()
          console.log(chapterPicList.value, '===')
        }
      }

      const onChangeChapter = (type: string) => {
        chapterId.value = type === 'next' ? next.value : prev.value
        querygetChapterDetail()
      }

      const onLoadPicture = () => {
        console.log('图像完成加载')
      }

      return {
        route,
        chapterPicList,
        onChangeChapter,
        chapterName,
        next,
        prev,
        onLoadPicture
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
