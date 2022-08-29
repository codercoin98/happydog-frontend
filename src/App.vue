<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs

import { ref } from "vue";

// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const name = "无名小站";
let expand = ref(true);
const leftList: string[] = ["books", "movies", "games", "news"];
</script>

<template>
  <div class="container">
    <div class="top">{{name}}</div>
    <div class="page_body">
      <div :style="{width: expand? '16rem':'10rem'}" class="left">
        <ul class="list">
          <li class="list_top">
            <button class="btn" @click="() => expand = !expand">{{expand?'收起':'展开'}}</button>
          </li>
          <li v-for="item in leftList" :key="item" class="item">{{item}}</li>
        </ul>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<style scoped lang="less">
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
  border-right: 1px solid #eee;
}
.right {
  flex: 1;
}
.list {
  list-style: none;
  padding: 0;
}
.list_top {
  padding: 10px 20px;
  display: flex;
  justify-content: end;
}
.item {
  display: flex;
  align-content: center;
  min-height: 30px;
  padding: 10px 20px;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  &:hover {
    cursor: pointer;
    background: #fafafa;
    transform: scaleX(1.1);
    border-radius: 10px;
  }
}
.btn {
  padding: 4px 10px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
    background: #bfbfbf;
  }
}
</style>
