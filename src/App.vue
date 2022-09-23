<template>
  <n-config-provider :theme-overrides="themeOverrides" class="m-0">
    <n-loading-bar-provider>
      <n-message-provider>
        <Message />
        <div class="lg:container lg:mx-auto lg:w-2/3 flex min-h-screen">
          <div class="flex-1 grid grid-flow-col grid-cols-5 gap-6">
            <Header />
            <div class="col-span-3 pt-3">
              <router-view />
            </div>
            <Footer />
          </div>
        </div>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>


</template>
<script setup lang="ts">
import Header from './pages/Header/index.vue'
import { NConfigProvider, GlobalThemeOverrides } from 'naive-ui'
import Footer from './pages/Footer/index.vue';
import Message from './components/Message/index.vue';
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