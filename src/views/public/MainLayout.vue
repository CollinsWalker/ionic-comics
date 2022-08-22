<template>
  <ion-page>
    <ion-content>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab1" href="/home">
            <ion-icon :icon="homeSharp" />
            <ion-label>首页</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/explore">
            <ion-icon :icon="planetSharp" />
            <ion-label>探索</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/profile">
            <ion-icon :icon="personSharp" />
            <ion-label>我的</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonContent,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet
  } from '@ionic/vue'
  import { homeSharp, planetSharp, personSharp } from 'ionicons/icons'

  export default {
    name: 'Tabs',
    components: {
      IonContent,
      IonLabel,
      IonTabs,
      IonTabBar,
      IonTabButton,
      IonIcon,
      IonPage,
      IonRouterOutlet
    },
    setup() {
      return {
        homeSharp,
        planetSharp,
        personSharp
      }
    }
  }
</script>

<style lang="less" scoped>
  ion-tab-bar {
    box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
      0px 1px 10px 0px rgb(0 0 0 / 12%);
  }
</style>
