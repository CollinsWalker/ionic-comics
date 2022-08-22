<template>
  <div class="container"> 收藏 </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { IonList, IonItem } from '@ionic/vue'
  import { home, heart, pin } from 'ionicons/icons'
  import { getBookShelf } from '@/utils/http/api'

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
