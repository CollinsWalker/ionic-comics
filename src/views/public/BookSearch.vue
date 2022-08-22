<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>搜素</ion-title>
      </ion-toolbar>
      <ion-searchbar v-model="searchText" :debounce="500"></ion-searchbar>
    </ion-header>
    <ion-content class="ion-padding"> </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import {
    IonContent,
    IonButton,
    IonButtons,
    IonBackButton,
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonSearchbar
  } from '@ionic/vue'
  import { getSearch } from '@/utils/http/api'

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
      IonSearchbar
    },
    setup() {
      const searchText = ref()

      watch(
        () => searchText.value,
        (val, preVal) => {
          //val为修改后的值,preVal为修改前的值
          console.log('message', val, preVal)
          if (val) querySearch(val)
        }
      )

      const querySearch = async (keyword: string) => {
        let params = {
          num: 12,
          keyword // 搜索关键字
        }
        let res = await getSearch(params)
        console.log(res, '===')
      }

      return {
        searchText
      }
    }
  })
</script>

<style lang="less" scoped>
  ion-header {
    background-color: #ffffff;
  }
  ion-searchbar {
    --box-shadow: none;
  }
</style>
