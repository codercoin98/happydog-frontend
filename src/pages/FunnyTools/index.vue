<template>
    <div>
        <p class="text-center my-10 text-lg">Some funny tools for you!</p>
        <ul class="grid-container grid grid-cols-4">
            <li v-for="item in tools" :key="item.title">
                <router-link :to="item.to" class="text-black hover:text-purple-400">
                    <ToolCard :title="item.title" :iconUrl="item.iconUrl" />
                </router-link>
            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import ToolCard from '@/components/ToolCard/index.vue';
const tools = [
{
title: 'Github用户检索',
iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
to: '/tools/github-profile'
},
{
title: 'Github用户检索',
iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
to: '/'
},
{
title: 'Github用户检索',
iconUrl: 'http://124.220.47.26:7777/images/dog.jpg',
to: '/'
}
]
</script>