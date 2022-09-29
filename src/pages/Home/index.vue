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
            <div v-if="state.loading" class="container flex justify-center">
                <n-spin :show="state.loading">
                    <template #icon>
                        <n-icon>
                            <Spinner />
                        </n-icon>
                    </template>
                </n-spin>
            </div>
            <ul v-else class="space-y-4">
                <li v-for="item in state.posts" :key="item._id" class="cursor-pointer border rounded-lg px-4"
                    @click="router.push(`/post/${item._id}`)">
                    <div class="flex justify-between items-center py-4">
                        <div class="flex items-center space-x-2">
                            <n-avatar round :src="item.author[0].avatar_url" :size="50" />
                            <div class="">
                                <p class="lg:text-lg">{{item.author[0].nickname}}</p>
                                <p class="text-gray-400">{{dayjs(item.created_at).fromNow()}}</p>
                            </div>
                        </div>
                        <n-popover trigger="click" placement="bottom-center">
                            <template #trigger>
                                <n-icon size="18" class="cursor-pointer hover:text-purple-400">
                                    <EllipsisH />
                                </n-icon>
                            </template>
                            <div class="w-32 py-2">
                                <p class="py-2 w-full text-center cursor-pointer hover:bg-gray-100">举报</p>
                            </div>
                        </n-popover>
                    </div>
                    <!--标题-->
                    <div class="lg:text-lg border-l-4 border-gray-300 pl-2 font-semibold">
                        {{item.title}}
                    </div>
                    <!--内容-->
                    <div class="max-h-40 py-2 overflow-y-clip text-ellipsis" v-html="item.content">
                    </div>
                    <div class="flex border-t divide-x py-4">
                        <span class="flex-1 flex justify-center items-center cursor-pointer hover:text-purple-400">
                            <n-icon size="18">
                                <HeartRegular />
                            </n-icon>
                        </span>
                        <span class="flex-1 flex justify-center items-center cursor-pointer hover:text-purple-400">
                            <n-icon size="18">
                                <CommentDotsRegular />
                            </n-icon>
                        </span>
                        <span class="flex-1 flex justify-center items-center cursor-pointer hover:text-purple-400">
                            <n-icon size="18">
                                <ShareSquareRegular />
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
import dayjs from '@/utils/day';
import { HeartRegular, CommentDotsRegular, ShareSquareRegular, Spinner, EllipsisH } from '@vicons/fa'
import { PostFull } from './types';
import { useRouter } from 'vue-router';
const router = useRouter()
interface State {
    posts: PostFull[];
    loading: boolean;
}
const state = reactive<State>({
    posts: [],
    loading: false
})
const onChange = (value: string) => {
    console.log(value);
}
onMounted(async () => {
    state.loading = true;
    const { data } = await getAllPost()
    if (data) {
        state.posts = data
        state.loading = false
    }
})
</script>

<style>

</style>