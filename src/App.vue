<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { ref } from "vue";
import moment from "moment";
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
let expand = ref(true);
const leftList: string[] = ["Home", "Friends", "Message", "Settings"];
const contentList = [
  {
    id: 1,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 2,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 3,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 4,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 5,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 6,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 7,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    id: 8,
    username: "Codercoin",
    content: "hello ! welcome to my website ! nice to meet you !",
    created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
];
</script>
<template>
  <div class="container mx-auto px-10 flex flex-col max-h-screen">
    <!--顶部-->
    <div class="flex-none h-20 py-3">
      <el-space>
        <el-avatar :size="50" src="http://124.220.47.26:7777/images/dog.jpg" />
        <span class="text-xl subpixel-antialiased font-semibold cursor-pointer">HappyDog</span>
      </el-space>
    </div>
    <!--主体-->
    <div class="flex flex-grow relative">
      <div class="w-40">
        <ul class="space-y-2">
          <li class="list_top">
            <button
              class="rounded-full border-purple-400 w-full px-4 py-2 mb-2 cursor-pointer text-purple-400 hover:border-purple-600"
              @click="() => expand = !expand"
            >{{expand?'登录':'注册'}}</button>
          </li>
          <li
            v-for="item in leftList"
            :key="item"
            class="flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-purple-500 hover:rounded-full hover:text-white"
          >
            {{item}}
            <el-icon size="14px">
              <ArrowRightBold />
            </el-icon>
          </li>
        </ul>
        <div
          class="absolute inset-x-0 bottom-0 h-20 w-40 flex justify-center items-center cursor-pointer hover:bg-gradient-to-b hover:from-gray-200 hover:to-gray-50 hover:rounded-full"
        >
          <a href="https://github.com/coderlcb" class="no-underline">@Codercoin</a>
        </div>
      </div>
      <div class="flex-1 px-10 overflow-hidden">
        <el-scrollbar>
          <ul class="space-y-6">
            <li
              v-for="item in contentList"
              :key="item.id"
              class="border border-grey-100 rounded-lg p-4"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="flex items-center space-x-4">
                  <el-avatar />
                  <span>{{item.username}}</span>
                </div>
                <p class="text-gray-400">{{item.created_at}}</p>
              </div>
              <div>{{item.content}}</div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
