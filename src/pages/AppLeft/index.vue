<template>
  <!--网站左侧-->
  <div class="flex flex-col relative">
    <div class="flex justify-center h-20 py-3">
      <router-link to="/" class="text-black ">
        <a-space>
          <a-avatar :size="50"><img src="http://124.220.47.26:7777/images/dog.jpg" /></a-avatar>
          <span class="text-xl text-black subpixel-antialiased font-semibold cursor-pointer">HappyDog</span>
        </a-space>
      </router-link>
    </div>
    <ul class="space-y-2">
      <li class="w-52">
        <router-link to="/sign-in">
          <div
            class="rounded-full text-center border border-purple-400 w-full px-4 py-2 mb-2 cursor-pointer text-purple-400 font-semibold hover:border-purple-500 hover:text-white hover:bg-purple-500 active:bg-purple-400 active:text-white active:border-opacity-0">
            Sign in
          </div>
        </router-link>
      </li>
      <li v-for="item in leftList" :key="item.title">
        <router-link :to="item.path" @click="changeRouter(item.path)"
          :class="state.checkedPath === item.path ? 'bg-purple-500 rounded-full text-white' : null"
          class="flex justify-between w-52 items-center px-4 py-2 cursor-pointer text-black font-semibold hover:bg-purple-500 hover:rounded-full hover:text-white">
          <icon-home v-if="item.key === 1" size="20"/>
          <icon-send v-else-if="item.key === 2" size="20"/>
          <icon-message v-else-if="item.key === 3" size="20"/>
          <icon-settings v-else-if="item.key === 4" size="20"/>
          {{ item.title }}
          <icon-right />
        </router-link>
      </li>
    </ul>
    <div class="absolute inset-x-0 bottom-0 h-20 w-40 flex flex-col justify-center items-center cursor-pointer">
      <a href="https://github.com/coderlcb" class="no-underline text-black align-middle">
        <a-space>
          <icon-github size="18" />Codercoin
        </a-space>
      </a>
      <div class="mt-2">{{ moment().format('dddd') }}</div>
    </div>
  </div>

</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { computed, reactive } from 'vue'
import moment from "moment";
moment.locale('zh-cn');
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
let state = reactive({
checkedPath: '/'
});
const leftList = [
{ key: 1, title: "主页", path: '/' },
{ key: 2, title: "纸飞机", path: '/paper-plane' },
{ key: 3, title: "圈子", path: '/friends' },
{ key: 4, title: "工具", path: '/funny-tools' },
];
//监听左侧按钮点击
const changeRouter = (path: string) => {
state.checkedPath = path;
}
</script>

  
<style scoped>
</style>
  