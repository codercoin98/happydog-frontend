<template>
    <div clas="container">
        <p class="text-center my-10 text-lg">一些有趣的工具，Have fun !</p>
        <ul class="grid-container grid grid-cols-4 place-items-stretch space-x-4">
            <li v-for="item in tools" :key="item.title" @click="router.push({path:item.to})">
                <ToolCard :title="item.title" :iconUrl="item.iconUrl" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import ToolCard from '@/components/ToolCard/index.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const tools = [
    {
        title: 'Github用户检索',
        iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
        to: '/'
    },
    {
        title: '图书检索',
        iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
        to: '/search-books'
    },
    {
        title: '哔哩哔哩检索',
        iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
        to: '/'
    },
    {
        title: '音乐检索',
        iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
        to: '/'
    }
]
</script>