<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { ref } from 'vue';

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const name = "无名小站";
const leftList = ['books','movies','games','news'];
let a = ref(0)
</script>

<template>
  <div class="container">
    <div class="top">{{name}}</div>
    <div class="page_body">
      <div class="left">
        <ul class="list">
          <li>
            <bitton class="expand" @click="a++">点我{{a}}</bitton>
          </li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.top {
  display: flex;
  height: 3.4rem;
  align-items: center;
  padding: 0 20px;
  background: #eee;
  border-bottom: 1px solid #eee;
}
.page_body {
  display: flex;
  flex: 1;
}
.left {
  width: 16rem;
  border-right: 1px solid #eee;
}
.right {
  flex: 1;
}
.list {
  list-style: none;
}
.expand {
  padding: 4px 10px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
}
.expand:hover {
  cursor: pointer;
  background: #bfbfbf;
}
</style>
