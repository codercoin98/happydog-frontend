<template>
  <div class="lg:container lg:mx-auto lg:w-1/2 flex flex-col min-h-screen">
    <div class="flex-none h-20 py-3">
      <router-link to="/" class="text-black ">
        <el-space>
        <el-avatar :size="50" src="http://124.220.47.26:7777/images/dog.jpg" />
        <span class="text-xl text-black subpixel-antialiased font-semibold cursor-pointer">HappyDog</span>
      </el-space> 
      </router-link>
     
    </div>
    <router-view />
  </div>
</template>
<script setup lang="ts">
</script>