<template>
  <div class="flex flex-col flex-1">
    <!--主体-->
    <div class="flex flex-grow relative">
      <div class="w-40">
        <ul class="space-y-2">
          <li>
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
              class="flex justify-between items-center px-4 py-2 cursor-pointer text-black hover:bg-purple-500 hover:rounded-full hover:text-white">
              {{ item.title }}
              <el-icon size="14px">
                <ArrowRightBold />
              </el-icon>
            </router-link>
          </li>
        </ul>
        <div class="absolute inset-x-0 bottom-0 h-20 w-40 flex flex-col justify-center items-center cursor-pointer">
          <a href="https://github.com/coderlcb" class="no-underline">@Codercoin</a>
          <div class="mt-2">{{ moment().format('dddd') }}</div>
        </div>
      </div>
      <div class="flex-1 px-10 overflow-hidden">
        <router-view name="rightView" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import moment from "moment";
moment.locale('zh-cn');
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
let state = reactive({
  checkedPath: '/'
});
const leftList = [
  { title: "Home", path: '/' },
  { title: "PaperPlane", path: '/paper-plane' },
  { title: "Friends", path: '/friends' },
  { title: "EveryDay", path: '/every-day' },
];
//监听左侧按钮点击
const changeRouter = (path: string) => {
  state.checkedPath = path;
}
</script>

  
<style scoped>
</style>
  