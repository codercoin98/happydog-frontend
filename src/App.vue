<template>
  <div class="lg:container lg:mx-auto lg:w-2/3 flex min-h-screen">
    <AppLeft />
    <div class="flex-1 py-3 px-10 overflow-hidden ">
      <router-view/>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppLeft from './pages/AppLeft/index.vue'
</script>