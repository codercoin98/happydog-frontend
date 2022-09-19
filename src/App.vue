<template>
  <n-config-provider :theme-overrides="themeOverrides" class="m-0">
    <n-message-provider>
      <div class="lg:container lg:mx-auto lg:w-2/3 flex min-h-screen">
        <AppLeft />
        <div class="flex-1 py-3 px-10 overflow-hidden ">
          <router-view />
        </div>
      </div>
    </n-message-provider>

  </n-config-provider>


</template>
<script setup lang="ts">
import AppLeft from './pages/AppLeft/index.vue'
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#8a2be2'
  },
  Button: {
    color: '#c084fc',
    textColor: '#fff',
  },
  Input: {
    borderFocus: '#8a2be2',
    borderHover: '#8a2be2',
  }
}
</script>