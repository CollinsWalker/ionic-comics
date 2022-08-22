<template>
  <div class="c-item">
    <ion-skeleton-text animated class="s-cover"></ion-skeleton-text>
  </div>
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
  .c-item {
    margin: 0;
    padding: 0;
  }
  .s-cover {
    width: 100%;
    height: 165px;
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
