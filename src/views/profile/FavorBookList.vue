<template>
  <div class="container"> 收藏 </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { IonList, IonItem } from '@ionic/vue'
  import { home, heart, pin } from 'ionicons/icons'
  import { getBookShelf } from '@/utils/http/api'
  import { storage } from '@/utils/storage'

  export default defineComponent({
    name: 'ProfilePage',
    components: {
      IonList,
      IonItem
    },
    setup() {
      onMounted(() => {
        initData()
      })

      const list = ref()

      const initData = async () => {
        let utoken = storage.get('utoken') || ''
        if (!utoken) return
        let res = await getBookShelf()
        console.log(res, 'res')
      }

      return {
        list
      }
    }
  })
</script>

<style lang="less" scoped></style>
