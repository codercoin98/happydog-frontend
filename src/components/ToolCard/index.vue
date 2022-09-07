<template>
    <div
        class="bg-gray rounded-md flex items-center justify-between min-h-10 p-4 shadow-md border ring-inset ring-2 ring-purple-200 hover:cursor-pointer hover:ring-purple-400">
        <a-avatar><img :src="iconUrl" /></a-avatar><span class="font-weight">{{title}}</span>
    </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue'
type Props = {
title: string,
iconUrl: string
}
const props = defineProps<Props>();
const { title = '', iconUrl } = toRefs(props);
</script>