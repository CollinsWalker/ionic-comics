<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- <ion-title>我的</ion-title> -->
        <ion-segment :value="tabValue" @ionChange="segmentChanged($event)">
          <ion-segment-button value="read"> 书架 </ion-segment-button>
          <ion-segment-button value="favor" disabled> 收藏 </ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <read-list v-if="tabValue === 'read'"></read-list>
      <favor-list v-if="tabValue === 'favor'"></favor-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonSegment,
    IonSegmentButton
  } from '@ionic/vue'
  import { home, heart, pin } from 'ionicons/icons'
  import {} from '@/utils/http/api'
  import ReadList from './ReadBookList.vue'
  import FavorList from './FavorBookList.vue'

  export default defineComponent({
    name: 'ProfilePage',
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonList,
      IonItem,
      IonSegment,
      IonSegmentButton,
      ReadList,
      FavorList
    },
    setup() {
      onMounted(() => {
        initData()
      })

      const tabValue = ref('read')
      const list = ref()

      const initData = async () => {}

      const segmentChanged = (ev: CustomEvent) => {
        // console.log('Segment changed', ev.detail)
        tabValue.value = ev.detail.value
      }

      return {
        tabValue,
        list,
        segmentChanged
      }
    }
  })
</script>

<style lang="less" scoped></style>
