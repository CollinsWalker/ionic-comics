<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button @click="toBookSearch">
            <ion-icon slot="icon-only" :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>漫画分类</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" :scroll-y="bookList.length > 0">
      <ion-card class="c-rate">
        <!-- 分类列表 -->
        <div class="tag-list">
          <span class="tag-title">分类:</span>
          <div class="c-list">
            <span
              :class="tagName !== item.tag_name ? 't-item' : 't-item active'"
              v-for="item in tagList"
              :key="item"
              @click="onChangeTag(item.tag_name)"
              >{{ item.tag_name }}</span
            >
          </div>
        </div>
        <!-- 地区列表 -->
        <div class="tag-list">
          <span class="tag-title">地区:</span>
          <div class="c-list">
            <span
              :class="areaId !== item.id ? 't-item' : 't-item active'"
              v-for="item in areaList"
              :key="item"
              >{{ item.area_name }}</span
            >
          </div>
        </div>
        <!-- 状态 -->
        <div class="tag-list">
          <span class="tag-title">状态:</span>
          <div class="c-list">
            <span
              :class="statusId !== item.value ? 't-item' : 't-item active'"
              v-for="item in statusList"
              :key="item.value"
              @click="changeStatus(item.value)"
              >{{ item.label }}</span
            >
          </div>
        </div>
      </ion-card>
      <ion-row v-if="bookList.length > 0">
        <ion-col class="c-col" size="4" v-for="book in bookList" :key="book.id">
          <item-book :itemData="book" @navBook="toBookDetail"></item-book>
        </ion-col>
      </ion-row>

      <ion-row v-else>
        <ion-col class="c-col" size="4" v-for="(item, index) in 10" :key="index">
          <Item-skeleton-book></Item-skeleton-book>
        </ion-col>
      </ion-row>
      <ion-infinite-scroll
        @ionInfinite="loadData($event)"
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="加载数据...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
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
    IonChip,
    IonIcon,
    IonLabel,
    IonRow,
    IonCol,
    InfiniteScrollCustomEvent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonCard,
    toastController,
    IonButtons,
    IonButton
  } from '@ionic/vue'
  import { search } from 'ionicons/icons'

  import { getTagList, getAreaList, getBookList } from '@/utils/http/api'
  import { useRouter } from 'vue-router'
  import ItemBook from './components/ItemBook.vue'
  import ItemSkeletonBook from './components/ItemSkeletonBook.vue'

  export default defineComponent({
    name: 'ExplorePage',
    components: {
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonPage,
      IonChip,
      IonIcon,
      IonLabel,
      IonRow,
      IonCol,
      IonInfiniteScroll,
      IonInfiniteScrollContent,
      IonCard,
      ItemBook,
      IonButtons,
      IonButton,
      ItemSkeletonBook
    },
    setup() {
      onMounted(() => {
        queryTagList()
        queryAreaList()
        queryBookList()
      })

      const isDisabled = ref(false)
      const pageNum = ref(1)
      const pageSize = ref(12)
      const count = ref(0)
      const isFirst = ref(true)
      const tagName = ref()
      const areaId = ref(1)
      const statusId = ref(-1)

      const tagList = ref([])
      const areaList = ref([])
      const statusList = ref([
        {
          label: '全部',
          value: -1
        },
        {
          label: '连载',
          value: 0
        },
        {
          label: '完结',
          value: 1
        }
      ])
      const bookList = ref([])

      const queryTagList = async () => {
        let res = await getTagList()
        if (res.data.success === 1 && res.data.tags.length > 0) {
          tagList.value = res.data.tags
          tagName.value = res.data.tags[0].tag_name
        }
      }

      const queryAreaList = async () => {
        let res = await getAreaList()
        if (res.data.success === 1 && res.data.areas.length > 0) {
          areaList.value = res.data.areas
        }
      }

      const queryBookList = async () => {
        let params = {
          area: areaId.value, // 地区id,
          tag: tagName.value, // 分类名
          end: statusId.value, // 1为完结，0为连载
          startItem: pageNum.value, // 分页起始
          pageSize: pageSize.value // 分页个数
        }
        let res = await getBookList(params)
        // console.log(res.data.books)
        if (res.data.success === 1) {
          if (res.data.books.length > 0) {
            bookList.value = isFirst.value ? res.data.books : bookList.value.concat(res.data.books)
            count.value = res.data.count
            // 判断如果最后一页小于定义的页数那么则禁止请求
            if (res.data.books.length < pageSize.value) isDisabled.value = true
          } else {
            bookList.value = []
            return
          }
        } else {
          bookList.value = []
          toastShow('暂无内容')
        }
      }

      const loadData = async (ev: InfiniteScrollCustomEvent) => {
        pageNum.value = pageNum.value += 1 * pageSize.value
        isFirst.value = false
        await queryBookList()
        ev.target.complete()

        if (bookList.value.length === count.value) {
          ev.target.disabled = true
        }
      }

      const onChangeTag = (name: string) => {
        pageNum.value = 1
        tagName.value = name
        isFirst.value = true
        bookList.value = []
        isDisabled.value = false
        queryBookList()
      }

      const router = useRouter()

      // 跳转到漫画详情
      const toBookDetail = (obj: { id: number; book_name: string }) => {
        router.push({
          path: '/book-detail',
          query: { id: obj.id, name: obj.book_name }
        })
      }
      // 跳转到漫画搜索
      const toBookSearch = () => {
        router.push({
          path: '/book-search'
        })
      }

      const changeStatus = (value: number) => {
        statusId.value = value
        pageNum.value = 1
        isFirst.value = true
        bookList.value = []
        isDisabled.value = false
        queryBookList()
      }

      // 消息弹窗
      const toastShow = async (message: string) => {
        const toast = await toastController.create({
          message,
          duration: 3000,
          color: 'danger',
          position: 'bottom'
        })
        return toast.present()
      }

      return {
        tagName,
        areaId,
        statusId,
        tagList,
        areaList,
        bookList,
        statusList,
        isDisabled,
        loadData,
        onChangeTag,
        toBookDetail,
        toBookSearch,
        changeStatus,
        search
      }
    }
  })
</script>

<style lang="less" scoped>
  .c-rate {
    padding: 10px 6px;
    margin: 8px 6px;
    .tag-list {
      font-size: 12px;
      display: flex;
      .tag-title {
        margin-right: 8px;
      }
      .c-list {
        flex: 1;
        display: flex;
        flex-wrap: wrap-reverse;
        .t-item {
          // width: 20%;
          min-width: 24px;
          margin-bottom: 8px;
          margin-right: 12px;
          &.active {
            color: #3880ff;
          }
        }
      }
    }
  }

  .c-col {
    padding: 6px;
  }
</style>
