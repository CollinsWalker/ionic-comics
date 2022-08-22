<template>
  <ion-item lines="none">
    <ion-skeleton-text animated class="s-cover"></ion-skeleton-text>
    <ion-label>
      <ion-skeleton-text animated class="s-name"></ion-skeleton-text>
      <ion-skeleton-text animated class="s-desc"></ion-skeleton-text>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
  import { IonItem, IonLabel, IonSkeletonText } from '@ionic/vue'
  import { defineComponent } from 'vue'
  export default defineComponent({
    components: {
      IonItem,
      IonLabel,
      IonSkeletonText
    }
  })
</script>
<style lang="less" scoped>
  .s-cover {
    width: 60px;
    height: 85px;
    margin-right: 20px;
  }
  .s-name {
    height: 24px;
    width: 50%;
  }
  .s-desc {
    height: 18px;
    width: 80%;
    margin-top: 10px;
  }
</style>
