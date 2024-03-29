<template>
  <!--网站左侧-->
  <header class="fixed flex flex-col py-3 h-screen lg:w-56">
    <!--logo以及网站名-->
    <div class="flex justify-start pl-2">
      <router-link to="/" class="text-black">
        <n-space class="flex items-center">
          <n-avatar :size="48" round src="/dog.png" />
          <span
            class="text-xl text-black dark:text-white subpixel-antialiased font-semibold cursor-pointer"
            >HappyDog</span
          >
        </n-space>
      </router-link>
    </div>
    <ul class="space-y-2">
      <li>
        <router-link to="/sign-in">
          <div
            v-if="!userStore.access_token"
            class="rounded-lg text-center border border-purple-400 w-full px-4 py-2 mb-2 cursor-pointer text-purple-400 font-semibold hover:border-purple-500 hover:text-white hover:bg-purple-500 active:bg-purple-400 active:text-white active:border-opacity-0"
          >
            登录
          </div>
        </router-link>
      </li>
      <li
        v-for="item in leftList"
        :key="item.title"
        :class="route.path === item.path ? 'rounded-lg text-purple-400 dark:text-purple-400' : null"
        class="relative flex items-center pl-2 pr-4 py-2 cursor-pointer text-black dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-500 hover:rounded-lg group"
        @click="router.push({ path: item.path })"
      >
        <n-icon size="20" class="mr-4">
          <Home v-if="item.key === 1" />
          <Gamepad v-else-if="item.key === 2" />
          <FacebookMessenger v-else-if="item.key === 3" />
          <User v-else-if="item.key === 4" />
        </n-icon>
        {{ item.title }}
        <n-icon size="18" class="absolute right-2 invisible group-hover:visible">
          <ChevronRight />
        </n-icon>
      </li>
      <li v-if="route.path !== '/create'">
        <button class="w-full primary-btn" @click="post">发帖子</button>
      </li>
    </ul>
    <n-popover v-if="userStore.userInfo" width="trigger" trigger="click">
      <template #trigger>
        <div
          class="absolute inset-x-0 bottom-3 mx-auto px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-200 hover:rounded-lg dark:bg-gray-500 dark:rounded-lg dark:hover:bg-gray-400 dark:active:bg-gray-500"
        >
          <div class="flex items-center">
            <n-avatar size="large" :src="userStore.userInfo?.avatar_url" />
            <span class="ml-2 overflow-ellipsi">{{ userStore.userInfo?.username }}</span>
          </div>
          <n-icon>
            <EllipsisH />
          </n-icon>
        </div>
      </template>
      <ul class="space-y-2">
        <li class="flex justify-center p-2">
          <n-switch
            size="large"
            :default-value="userStore.theme"
            unchecked-value="light"
            checked-value="dark"
            :on-update:value="onModeSelect"
          >
            <template #checked-icon>
              <n-icon color="#1F2937">
                <Moon />
              </n-icon>
            </template>
            <template #unchecked-icon>
              <n-icon color="#F59E0B">
                <Sun />
              </n-icon>
            </template>
          </n-switch>
        </li>
        <li
          class="flex justify-center items-center cursor-pointer p-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-500"
          @click="logout"
        >
          <n-icon>
            <PowerOff />
          </n-icon>
          退出登录
        </li>
      </ul>
    </n-popover>
  </header>
</template>
<script setup lang="ts">
import { leftList } from '@/constants/system'
import { useUserStore } from '@/store'
import {
ChevronRight,
EllipsisH,
FacebookMessenger,
Gamepad,
Home,
Moon,
PowerOff,
Sun,
User,
} from '@vicons/fa'
import { NIcon } from 'naive-ui'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const route = useRoute()
//主题切换
const onModeSelect = (value: string): void => {
  if (value === 'dark') {
    userStore.theme = 'dark'
    document.documentElement.classList.add('dark')
    return
  }
  userStore.theme = 'light'
  document.documentElement.classList.remove('dark')
}
const post = (): void => {
  if (!userStore.access_token) {
    window.$message.warning('请先登录')
    router.push('/sign-in')
    return
  }
  router.push('/create')
}
//退出登录
const logout = (): void => {
  userStore.access_token = null
  userStore.userInfo = null
  localStorage.removeItem('token')
  window.$message.success('注销成功！')
  router.push('/home')
}
onMounted(() => {
  if (userStore.access_token) {
    userStore.getUser()
  }
})
</script>
<style>
.n-popover {
  padding: 10px 0 !important;
  border-radius: 0.5rem !important;
}
</style>
