<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :theme="userStore.theme === 'dark' ? darkTheme : null"
    class="m-0 text-black dark:bg-gray-900 dark:text-white"
  >
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <message />
          <div class="flex flex-row">
            <div class="flex justify-end lg:flex-grow-0 h-screen w-1/4">
              <header-component ref="headerRef" />
            </div>
            <main class="flex w-1/2 lg:flex-grow py-3 px-4">
              <router-view />
            </main>
            <div class="flex lg:flex-grow-0 w-1/4">
              <footer-component />
            </div>
            <n-back-top :right="100" />
          </div>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui'
import Message from './components/Message/index.vue'
import HeaderComponent from '@/components/Header/index.vue'
import FooterComponent from '@/components/Footer/index.vue'
import { useUserStore } from './store'
import { onMounted } from 'vue'

const userStore = useUserStore()
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#8a2be2',
  },
  Button: {
    color: '#c084fc',
    textColor: '#fff',
  },
  Input: {
    borderFocus: '#8a2be2',
    borderHover: '#8a2be2',
  },
  Select: {
    peers: {
      InternalSelection: {
        borderFocus: '#8a2be2',
        borderHover: '#8a2be2',
      },
      InternalSelectMenu: {
        optionTextColorPressed: '#8a2be2',
      },
    },
  },
  BackTop: {
    iconColorHover: '#8a2be2',
    iconColorPressed: '#8a2be2',
  },
}
onMounted(() => {
  if (userStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>
