<template>
  <ion-card class="c-card" button @click="toBookDetail(bookData)">
    <span class="c-status">{{ bookData.book.end === 0 ? '连载' : '完结' }}</span>
    <ion-thumbnail class="c-thumbnail">
      <img :src="bookData.book.cover_url" />
    </ion-thumbnail>

    <ion-card-subtitle class="c-title">{{ bookData.book.book_name }}</ion-card-subtitle>
  </ion-card>
</template>

<script lang="ts">
  import { IonItem, IonLabel, IonCard, IonThumbnail, IonCardSubtitle } from '@ionic/vue'
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    props: {
      itemData: Object
    },
    components: {
      IonItem,
      IonLabel,
      IonCard,
      IonThumbnail,
      IonCardSubtitle
    },
    setup(props, { emit }) {
      const bookData = ref()
      let { itemData } = props
      bookData.value = itemData

      const toBookDetail = () => {
        emit('navBook', itemData)
      }
      return {
        bookData,
        toBookDetail
      }
    }
  })
</script>

<style lang="less" scoped>
  .c-card {
    margin: 0;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0 6px 6px 0;
    overflow: hidden;
    .c-thumbnail {
      height: 165px;
      width: 100%;
    }
    .c-title {
      font-size: 14px;
      color: #000000;
      margin: 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .c-content {
      font-size: 12px;
      margin: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .c-status {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffffff;
      padding: 2px 6px;
      border-radius: 0 0 10px 0;
      font-size: 12px;
    }
  }
</style>
