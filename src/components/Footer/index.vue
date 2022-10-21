<template>
  <div class="fixed flex flex-col pt-3 w-64">
    <div class="mb-2">
      <n-input round placeholder="搜索">
        <template #prefix>
          <n-icon>
            <Search />
          </n-icon>
        </template>
      </n-input>
    </div>
    <div class="flex flex-col p-2 border rounded-lg mb-2">
      <n-list>
        <template #header>
          <div class="font-semibold">当前热帖：</div>
        </template>
        <n-list-item v-for="(item, index) in hot_post">
          <template #prefix> {{ index + 1 }}. </template>
          {{ item }}
        </n-list-item>
      </n-list>
    </div>
    <div
      class="border rounded-lg p-2 flex flex-col justify-center items-center cursor-pointer mb-2"
    >
      <a
        href="https://github.com/coderlcb/HappyDog"
        class="no-underline text-black dark:text-gray-500 dark:hover:text-white"
      >
        <n-space class="flex items-center">
          <n-icon size="20">
            <Github />
          </n-icon>
        </n-space>
      </a>
      <div class="mt-2">{{ dayjs().format('dddd') }}</div>
    </div>
    <div class="flex justify-center">
      <router-link to="/about" class="text-gray-400 hover:text-gray-500 dark:hover:text-white"
        >关于本站</router-link
      >·<router-link to="/tos" class="text-gray-400 hover:text-gray-500 dark:hover:text-white"
        >用户协议</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github, Search } from '@vicons/fa'
import dayjs from '@/utils/day'
const hot_post: string[] = ['test', 'test', 'test', 'test', 'test', 'test']
</script>

<style scoped></style>
