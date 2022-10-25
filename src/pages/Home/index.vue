<template>
  <div id="home" class="relative container h-full flex flex-col">
    <div class="space-y-4">
      <n-tabs
        type="line"
        default-value="recommand"
        justify-content="center"
        animated
        tab-style="margin-right: 2rem"
        :on-update:value="onChange"
        class="sticky top-0 bg-white"
      >
        <n-tab name="recommand">
          <p class="lg:text-lg">推荐</p>
        </n-tab>
        <n-tab name="hot">
          <p class="lg:text-lg">热门</p>
        </n-tab>
        <n-tab name="latest">
          <p class="lg:text-lg">最新</p>
        </n-tab>
      </n-tabs>
      <div v-if="state.loading" class="container flex justify-center">
        <n-spin :show="state.loading">
          <template #icon>
            <n-icon>
              <Spinner />
            </n-icon>
          </template>
        </n-spin>
      </div>
      <ul v-else class="space-y-4 overflow-y-auto">
        <li
          v-for="item in state.posts"
          :key="item._id"
          class="cursor-pointer border rounded-lg px-4"
          @click="router.push(`/post/${item._id}`)"
        >
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center space-x-2">
              <n-avatar round :src="item.author[0].avatar_url" :size="50" />
              <div class="">
                <p class="lg:text-lg">{{ item.author[0].nickname }}</p>
                <div class="space-x-2">
                  <span class="text-gray-400">{{ dayjs(item.created_at).fromNow() }}</span>
                  <a href="/" v-for="i in changeToCategory(item.categories)" class="text-gray-400">
                    {{ i }}
                  </a>
                </div>
              </div>
            </div>
            <n-popover trigger="hover" placement="bottom-center">
              <template #trigger>
                <div class="flex items-center p-2 rounded-lg group hover:bg-gray-100">
                  <n-icon size="18" class="cursor-pointer group-hover:text-purple-400">
                    <EllipsisH />
                  </n-icon>
                </div>
              </template>
              <div class="w-32 py-2">
                <p
                  class="py-2 w-full text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500"
                >
                  举报
                </p>
              </div>
            </n-popover>
          </div>
          <!--标题-->
          <div class="lg:text-lg border-l-4 border-gray-300 pl-2 font-semibold">
            {{ item.title }}
          </div>
          <!--内容-->
          <div class="max-h-40 py-2 overflow-y-clip text-ellipsis" v-html="item.content"></div>
          <div class="flex justify-between border-t py-1">
            <button @click.stop="" class="flex-1 post-btn">
              <n-icon size="18">
                <HeartRegular />
              </n-icon>
            </button>
            <button @click.stop="" class="flex-1 post-btn">
              <n-icon size="18">
                <CommentDotsRegular />
              </n-icon>
              <p class="ml-1">{{ item.comment_count }}</p>
            </button>
            <button @click.stop="" class="flex-1 post-btn">
              <n-icon size="18">
                <ShareSquareRegular />
              </n-icon>
            </button>
          </div>
        </li>
      </ul>
      <div v-if="state.loadingMore" class="container flex justify-center">
        <n-spin :show="state.loadingMore">
          <template #icon>
            <n-icon>
              <Spinner />
            </n-icon>
          </template>
        </n-spin>
      </div>
      <p v-if="state.finished" class="text-center">没有其他数据了</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue'
import { getAllPost } from '@/services/post/post.api'
import dayjs from '@/utils/day'
import {
  HeartRegular,
  CommentDotsRegular,
  ShareSquareRegular,
  Spinner,
  EllipsisH,
} from '@vicons/fa'
import { PostFull } from '@/types/post'
import { useRouter } from 'vue-router'
import { changeToCategory } from '@/utils/format'
const router = useRouter()
interface State {
  posts: PostFull[]
  loading: boolean
  loadingMore: boolean
  currentPage: number
  finished: boolean
}
const state = reactive<State>({
  posts: [],
  loading: false,
  loadingMore: false,
  currentPage: 1,
  finished: false,
})
const onChange = (value: string) => {
  console.log(value)
}
const handleScroll = async () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let clientHeight = document.documentElement.clientHeight
  let scrollHeight = document.documentElement.scrollHeight
  let bottomOfWindow = scrollTop + clientHeight >= scrollHeight - 4
  if (scrollTop != 0 && bottomOfWindow && !state.finished) {
    try {
      state.loadingMore = true
      const { data } = await getAllPost({
        currentPage: state.currentPage + 1,
        size: 5,
      })
      if (data.length > 0) {
        state.currentPage + 1
        state.posts = state.posts.concat(data)
        state.loadingMore = false
      }
      //没有数据
      state.finished = true
      state.loadingMore = false
    } catch (error) {
      state.loadingMore = false
    }
  }
}

onMounted(async () => {
  state.loading = true
  const { data } = await getAllPost({
    currentPage: state.currentPage,
    size: 5,
  })
  if (data) {
    state.posts = data
    state.loading = false
  }
  window.addEventListener('scroll', handleScroll, true)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<style></style>
