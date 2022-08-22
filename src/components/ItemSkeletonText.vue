<template>
  <ion-item>
    <ion-skeleton-text animated class="s-text" slot="start"></ion-skeleton-text>
    <ion-label>
      <ion-skeleton-text animated class="s-content"></ion-skeleton-text>
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
  .s-text {
    height: 24px;
    width: 24px;
  }
  .s-content {
    height: 20px;
    width: 80%;
  }
</style>
