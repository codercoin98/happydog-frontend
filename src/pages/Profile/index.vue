<template>
    <div class="container h-full flex flex-col">
        <div class="flex pb-4 border-bottom border-b-2">
            <n-avatar :src="userStore.userInfo?.avatar_url" :size="100" />
            <div class="flex flex-col place-content-end ml-4">
                <p class="text-black font-medium lg:text-xl">{{userStore.userInfo?.nickname}}</p>
                <p class="text-gray-300 font-medium lg:text-lg">@{{userStore.userInfo?.username}}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
const userStore = useUserStore()

</script>