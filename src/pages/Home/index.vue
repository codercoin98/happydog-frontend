<template>
    <div class="container h-full flex flex-col">
        <div class="p-2 space-y-4">
            <n-tabs type="line" default-value="recommand" justify-content="center" animated
                tab-style="margin-right: 2rem" :on-update:value="onChange">
                <n-tab name="recommand">
                    <p class="lg:text-lg">推荐</p>
                </n-tab>
                <n-tab name="hot">
                    <p class="lg:text-lg">热门</p>
                </n-tab>
                <n-tab name="latest">
                    <p class="lg:text-lg">最新</p>
                </n-tab>
            </n-tabs>
            <ul class="space-y-4">
                <li v-for="item in state.posts" :key="item._id" class="border rounded-lg px-4">
                    <div class="flex items-center border-bottom border-b-2 py-2">
                        <n-avatar :src="item.author.avatar_url" />
                        <p>{{item.author.nickname}}</p>
                        <p>{{moment(item.created_at).format('YYYY-MM-DD H:mm:ss')}}</p>
                    </div>
                    <div>
                        {{item.title}}
                    </div>
                    <div class="h-20">
                        {{item.content}}
                    </div>
                    <div class="flex border-top border-t-2 py-4">
                        <span class="flex-1 flex justify-center items-center cursor-pointer">
                            <n-icon size="18">
                                <Heart />
                            </n-icon>
                        </span>
                        <n-divider vertical />
                        <span class="flex-1 flex justify-center items-center cursor-pointer">
                            <n-icon size="18">
                                <Comment />
                            </n-icon>
                        </span>
                        <n-divider vertical />
                        <span class="flex-1 flex justify-center items-center cursor-pointer">
                            <n-icon size="18">
                                <Share />
                            </n-icon>
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { getAllPost } from '@/services/post/post.api';
import moment from 'moment';
import { Heart, Comment, Share } from '@vicons/fa'
import { PostFull } from './types';
interface State {
    posts: PostFull[];
}
const state = reactive<State>({
    posts: []
})
const onChange = (value: string) => {
    console.log(value);
}
onMounted(async () => {
    const { data } = await getAllPost()
    if (data) {
        state.posts = data
    }
})
</script>

<style>

</style>