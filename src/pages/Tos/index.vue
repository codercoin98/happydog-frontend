<template>
  <div class="container h-full flex flex-col space-y-4">
    <top-bar>
      <template #title>
        <span class="text-lg">服务条款</span>
      </template>
    </top-bar>
    <v-md-preview :text="aboutMD" class="border rounded-lg"></v-md-preview>
  </div>
</template>
<script setup lang="ts">
import TopBar from '@/components/topbar/index.vue'
import aboutMD from '@/assets/about.md?raw'
</script>

<style scoped></style>
