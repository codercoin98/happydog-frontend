<template>
  <n-config-provider :theme-overrides="themeOverrides" class="m-0">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <message />
          <div class="flex flex-row">
            <div class="flex justify-end lg:flex-grow-0 h-screen w-1/4">
              <header-component />
            </div>
            <main class="flex w-1/2 lg:flex-grow py-3 px-4">
              <router-view />
            </main>
            <div class="flex lg:flex-grow-0 w-1/4">
              <footer-component />
            </div>
          </div>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import Message from './components/Message/index.vue'
import HeaderComponent from '@/components/Header/index.vue'
import FooterComponent from '@/components/Footer/index.vue';
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