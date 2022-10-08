<template>
    <div class="container space-y-4">
        <!--顶部-->
        <div class="flex justify-between items-center">
            <span
                class="flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200  hover:text-purple-400"
                @click="router.back()">
                <n-icon size="20">
                    <ChevronLeft />
                </n-icon>
            </span>
            <span class="lg:text-lg md:text-sm font-bold">帖子</span>
            <n-popover trigger="click" placement="bottom-center">
                <template #trigger>
                    <span
                        class="flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200  hover:text-purple-400">
                        <n-icon size="18" class="cursor-pointer hover:text-purple-400">
                            <EllipsisH />
                        </n-icon>
                    </span>
                </template>
                <div class="w-32 py-2">
                    <p class="py-2 w-full text-center cursor-pointer hover:bg-gray-100">举报</p>
                </div>
            </n-popover>
        </div>
        <!--帖子信息-->
        <div class="border rounded-lg px-4">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center space-x-2">
                    <n-avatar round :src="state.post?.author[0].avatar_url" :size="50" />
                    <div class="">
                        <p class="lg:text-lg">{{state.post?.author[0].nickname}}</p>
                        <p class="text-gray-400">发布于{{dayjs(state.post?.created_at).fromNow()}}</p>
                    </div>
                </div>
            </div>
            <!--标题-->
            <p class="lg:text-lg  border-l-4 border-gray-300 pl-2 font-semibold text-ellipsis">
                {{state.post?.title}}
            </p>
            <!--内容-->
            <div class="py-2" v-html="state.post?.content">
            </div>
            <div class="flex justify-between border-t py-1">
                <button @click.stop=""
                    class="flex-1 flex justify-center items-center py-2 border-none bg-transparent   hover:border-none hover:bg-gray-100 hover:text-purple-400 focus:outline-none">
                    <n-icon size="18">
                        <HeartRegular />
                    </n-icon>
                </button>
                <button @click.stop=""
                    class="flex-1 flex justify-center items-center py-2  border-none bg-transparent hover:border-none hover:bg-gray-100 hover:text-purple-400 focus:outline-none">
                    <n-icon size="18">
                        <CommentDotsRegular />
                    </n-icon>
                </button>
                <button @click.stop=""
                    class="flex-1 flex justify-center items-center py-2 border-none bg-transparent hover:border-none hover:bg-gray-100 hover:text-purple-400 focus:outline-none">
                    <n-icon size="18">
                        <ShareSquareRegular />
                    </n-icon>
                </button>
            </div>
        </div>
        <!--评论区-->
        <div v-if="userStore.access_token !== '' " class="space-y-4">
            <p class="lg:text-lg font-semibold">评论(
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to="9999" />+)
            </p>
            <div class="flex space-x-2">
                <n-input round autosize maxlength="100" show-count clearable placeholder="贴主期待你的评论~" class="flex-1" />
                <button class="bg-purple-500 border-none text-white focus:outline-none active:bg-purple-400">发送</button>
            </div>
            <div class="border rounded-lg p-4">
                <ul class="flex flex-col space-y-2 divide-y">
                    <li v-for="item in comment" :key="item._id" class="relative pl-14 pt-4 group">
                        <div class="absolute left-0">
                            <n-avatar round :src="item.from_user.avatar_url" :size="50" />
                        </div>
                        <!--用户信息-->
                        <div class="py-3">
                            <a href="/#" class="text-black">{{item.from_user.nickname}}</a>
                        </div>
                        <!--内容-->
                        <div class="py-2 ">
                            {{item.comment}}
                        </div>
                        <!--操作-->
                        <div class="flex justify-between items-center h-10">
                            <div class="flex items-center space-x-4">
                                <p>{{dayjs(item.created_at).fromNow()}}</p>
                                <span class="flex items-center space-x-1">
                                    <n-icon class=" cursor-pointer hover:text-purple-500">
                                        <HeartRegular />
                                    </n-icon>
                                    <p>{{item.like}}</p>
                                </span>
                                <p class="text-gray-500 cursor-pointer">回复</p>
                            </div>
                            <n-popover trigger="click" placement="bottom-center">
                                <template #trigger>
                                    <span
                                        class="invisible group-hover:visible flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200  hover:text-purple-400 ">
                                        <n-icon size="18" class="cursor-pointer hover:text-purple-400">
                                            <EllipsisH />
                                        </n-icon>
                                    </span>
                                </template>
                                <div class="w-32 py-2">
                                    <p class="py-2 w-full text-center cursor-pointer hover:bg-gray-100">举报</p>
                                </div>
                            </n-popover>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else class="text-center">
            登录后进行评论
        </div>
    </div>
</template>

<script setup lang="ts">
import { getPostById } from '@/services/post/post.api';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeft, EllipsisH, HeartRegular, CommentDotsRegular, ShareSquareRegular } from '@vicons/fa'
import { PostFull } from '../Home/types';
import dayjs from '@/utils/day'
import { useUserStore } from '@/store';
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
interface State {
    post: PostFull | null
}
const state = reactive<State>({
    post: null
})
const comment = [
    {
        _id: '1',
        comment: '我去sadsadsadsadsadsadsadsadsa',
        from_user: {
            _id: "632d81e04a8b9164b273f738",
            username: "1015761882@qq.com",
            nickname: "nihao",
            avatar_url: "http://localhost:3000/default_avatar.png"
        },
        to_post_id: '63314ab12c0b1cac75788c46',
        to_comment_id: null,
        like: 1000,
        created_at: "2022-09-26T06:46:09.831Z",
    },
    {
        _id: '2',
        comment: '大哥大哥',
        from_user: {
            _id: "632d81e04a8b9164b273f738",
            username: "1015761882@qq.com",
            nickname: "牛啊牛啊",
            avatar_url: "http://localhost:3000/default_avatar.png"
        },
        to_post_id: '63314ab12c0b1cac75788c46',
        to_comment_id: '1',
        like: 99,
        created_at: "2022-09-26T06:46:09.831Z",
    },
    {
        _id: '3',
        comment: 'ooooo',
        from_user: {
            _id: "632d81e04a8b9164b273f738",
            username: "1015761882@qq.com",
            nickname: "nihao",
            avatar_url: "http://localhost:3000/default_avatar.png"
        },
        to_post_id: '63314ab12c0b1cac75788c46',
        to_comment_id: '2',
        like: 1000,
        created_at: "2022-09-26T06:46:09.831Z",
    },
    {
        _id: '4',
        comment: 'ooooo',
        from_user: {
            _id: "632d81e04a8b9164b273f738",
            username: "1015761882@qq.com",
            nickname: "nihao",
            avatar_url: "http://localhost:3000/default_avatar.png"
        },
        to_post_id: '63314ab12c0b1cac75788c46',
        to_comment_id: '2',
        like: 1000,
        created_at: "2022-09-26T06:46:09.831Z",
    },
    {
        _id: '5',
        comment: 'ooooo',
        from_user: {
            _id: "632d81e04a8b9164b273f738",
            username: "1015761882@qq.com",
            nickname: "nihao",
            avatar_url: "http://localhost:3000/default_avatar.png"
        },
        to_post_id: '63314ab12c0b1cac75788c46',
        to_comment_id: '2',
        like: 1000,
        created_at: "2022-09-26T06:46:09.831Z",
    }
]
onMounted(async () => {
    const { data } = await getPostById(route.params.post_id.toString())
    if (data) {
        state.post = data[0]
    }
})
</script>

<style scoped>

</style>