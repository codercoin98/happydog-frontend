<template>
    <div class="relative flex justify-center items-center">
        <span
            class="absolute left-0 flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200  hover:text-purple-400"
            @click="router.back()">
            <n-icon size="20">
                <ChevronLeft />
            </n-icon>
        </span>
        <span class="lg:text-lg md:text-sm font-bold">
            <slot name="title"></slot>
        </span>
        <div class="absolute right-0">
            <slot name="right"></slot>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ChevronLeft } from '@vicons/fa';
const router = useRouter()
</script>

<style scoped>

</style>