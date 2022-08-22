<template>
  <ion-item button @click="toBookDetail()" lines="none">
    <ion-thumbnail slot="start" class="c-thumbnail">
      <img :src="bookData.cover_url" alt="暂无图片" />
    </ion-thumbnail>
    <ion-label>
      <h3 class="book-name"> {{ bookData.book_name }}</h3>
      <p class="book-author"> {{ bookData.author_name }}</p>
      <p class="book-desc"> {{ bookData.summary }}</p>
      <p class="book-status"> {{ bookData.end === 0 ? '连载' : '完结' }}</p>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
  import { IonItem, IonLabel, IonThumbnail } from '@ionic/vue'
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    props: {
      itemData: Object
    },
    components: {
      IonItem,
      IonLabel,
      IonThumbnail
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
  .c-thumbnail {
    width: 60px;
    height: 85px;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
      0 1px 18px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0 6px 6px 0;
    overflow: hidden;
  }
  .book-name {
    font-size: 16px;
    color: #161c41;
  }
  .book-author {
    font-size: 12px;
  }
  .book-desc {
    font-size: 12px;
    color: #8a9aaa;
  }
  .book-status {
    font-size: 12px;
  }
</style>
