<template>
    <div class="container h-full flex flex-col pt-6 px-6 border rounded-lg">
        <div class="relative flex justify-center items-center w-full pb-2 border-bottom border-b-2">
            <div @click="router.back()"
                class="absolute left-0 flex justify-center items-center p-1 rounded hover:cursor-pointer hover:bg-gray-200 hover:text-purple-400">
                <n-icon size="22">
                    <ChevronLeft />
                </n-icon>
            </div>
            <p class="text-base font-semibold">服务条款</p>
        </div>
        <div class="py-2">
            <h1 class="font-bold">欢迎使用HappyDog游戏社区</h1>
            <p class="text-sm">本站的宗旨和目标是，做一个免费的、开源的、专注于游戏的开放社区。</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ChevronLeft } from '@vicons/fa'
const router = useRouter();
</script>

<style scoped>

</style>