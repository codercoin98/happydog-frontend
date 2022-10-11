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
            <!--标题-->
            <p class="lg:text-lg font-semibold">评论(
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to="state.comments.length" />)
            </p>
            <!--输入区域-->
            <div class="flex space-x-2">
                <n-input round autosize maxlength="100" show-count clearable placeholder="贴主期待你的评论~" class="flex-1"
                    v-model:value="state.commentInput" />
                <button class="bg-purple-500 border-none text-white focus:outline-none active:bg-purple-400"
                    @click="submitComment">发送</button>
            </div>
            <!--评论-->
            <div v-if="state.comments.length > 0" class="border rounded-lg p-4">
                <ul class="flex flex-col space-y-2 divide-y">
                    <li v-for="item in state.comments" :key="item._id">
                        <!--根评论-->
                        <div class="relative pl-14 pt-4 mb-2 group">
                            <div class="absolute left-0">
                                <n-avatar round :src="item.user[0].avatar_url" :size="50" />
                            </div>
                            <!--用户信息-->
                            <div class="py-3">
                                <a href="/#" class="text-black">{{item.user[0].nickname}}</a>
                            </div>
                            <!--内容-->
                            <div class="py-2 ">
                                {{item.content}}
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
                                    <p class="text-gray-500 cursor-pointer"
                                        @click="handleReplyClick(item.user[0].nickname)">回复
                                    </p>
                                </div>
                                <!--举报、删除-->
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
                                        <p v-if="item.user[0]._id === userStore.userInfo?._id"
                                            class="py-2 w-full text-center cursor-pointer hover:bg-gray-100"
                                            @click="deleteComment(item._id)">删除</p>
                                    </div>
                                </n-popover>
                            </div>
                            <!--回复框-->
                            <div v-if="state.replyInputVisible">
                                <p v-if="userStore.access_token === ''">请登录后操作</p>
                                <div v-else class="flex space-x-2">
                                    <n-input round autosize maxlength="100" show-count clearable
                                        :placeholder="`回复：@${state.replyUser}`" class="flex-1"
                                        v-model:value="state.replyInput" />
                                    <button
                                        class="bg-purple-500 border-none text-white focus:outline-none active:bg-purple-400"
                                        @click="submitReply(item._id,item.post_id)">发送</button>
                                </div>
                            </div>
                        </div>
                        <!--回复-->
                        <ul v-if="item.reply_list && item.reply_list.length > 0" class="pl-14">
                            <li v-for="item2 in item.reply_list" class="mb-2 group">
                                <div class="flex items-center space-x-2">
                                    <n-avatar round :src="item2.user[0].avatar_url" :size="40" />
                                    <a href="/#" class="text-black">{{item2.user[0].nickname}}</a>
                                    <span> : </span>
                                    <p>{{item2.content}}</p>
                                </div>
                                <div class="flex justify-between items-center h-10 pl-10">
                                    <div class="flex items-center space-x-4">
                                        <p>{{dayjs(item2.created_at).fromNow()}}</p>
                                        <span class="flex items-center space-x-1">
                                            <n-icon class=" cursor-pointer hover:text-purple-500">
                                                <HeartRegular />
                                            </n-icon>
                                            <p>{{item2.like}}</p>
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
                                            <p v-if="item2.user[0]._id === userStore.userInfo?._id"
                                                class="py-2 w-full text-center cursor-pointer hover:bg-gray-100"
                                                @click="deleteReply(item2._id,item2.reply_to_comment_id)">删除</p>
                                        </div>
                                    </n-popover>
                                </div>
                            </li>
                        </ul>
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
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeft, EllipsisH, HeartRegular, CommentDotsRegular, ShareSquareRegular } from '@vicons/fa'
import { PostFull } from '../Home/types';
import dayjs from '@/utils/day'
import { useUserStore } from '@/store';
import usePostStore from '@/store/post.store';
import { createComment, deleteCommentById } from '@/services/comment/comment.api';
import { useLoadingBar } from 'naive-ui';
import { createReply, deleteReplyById } from '@/services/reply/reply.api';
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const postStore = usePostStore()
const loadingBar = useLoadingBar()
interface State {
    post: PostFull | null
    comments: COMMENT_API.CommentFull[]
    commentInput: string | null
    replyInput: string | null
    replyInputVisible: boolean
    replyUser: string | null
}
const state = reactive<State>({
    post: null,
    comments: [],
    commentInput: null,
    replyInput: null,
    replyInputVisible: false,
    replyUser: null
})
//提交评论
const submitComment = async () => {
    if (!state.commentInput) {
        window.$message.warning('不能发送空评论！')
        return
    }
    try {
        loadingBar.start()
        const { data } = await createComment({
            post_id: state.post!._id!,
            content: state.commentInput,
            user_id: userStore.userInfo!._id!
        })
        if (data.length > 0) {
            loadingBar.finish()
            window.$message.success('评论成功！')
            state.commentInput = null
            state.comments.unshift(data[0])
        }
    } catch (error) {
        loadingBar.error()
        return
    }
}
//提交回复
const submitReply = async (comment_id: string, post_id: string) => {
    if (!state.replyInput) {
        window.$message.warning('不能发送空评论！')
        return
    }
    try {
        loadingBar.start()
        const { data } = await createReply({
            post_id: post_id,
            content: state.replyInput,
            user_id: userStore.userInfo!._id!,
            reply_to_comment_id: comment_id
        })
        if (data && data.length > 0) {
            loadingBar.finish()
            window.$message.success('回复成功！')
            state.replyInput = null
            state.comments = state.comments.map(e => {
                if (e._id === comment_id) {
                    e.reply_list.push(data[0])
                }
                return e
            })
        }
    } catch (error) {
        loadingBar.error()
        return
    }
}
//删除评论
const deleteComment = async (comment_id: string) => {
    try {
        loadingBar.start()
        const { data } = await deleteCommentById(comment_id)
        if (data && data.deletedCount === 1) {
            //删除成功
            loadingBar.finish()
            window.$message.success('删除成功！')
            state.comments = state.comments.filter(item => {
                return item._id !== comment_id
            })
        }
    } catch (error) {
        loadingBar.error()
        return
    }
}
//删除回复
const deleteReply = async (reply_id: string, comment_id: string) => {
    try {
        loadingBar.start()
        const { data } = await deleteReplyById(reply_id)
        if (data && data.deletedCount === 1) {
            //删除成功
            loadingBar.finish()
            window.$message.success('删除成功！')
            const target = state.comments.find(item => {
                return item._id === comment_id
            })
            state.comments.forEach(item => {
                if (item._id === comment_id) {
                    item.reply_list.filter(e => {
                        return e._id !== reply_id
                    })
                }
            })
        }
    } catch (error) {
        loadingBar.error()
        return
    }
}
//控制回复点击
const handleReplyClick = (username: string) => {
    state.replyInputVisible = true
    state.replyUser = username
}
onMounted(async () => {
    const post = await postStore.getPostById(route.params.post_id.toString())
    const comments = await postStore.getComments(route.params.post_id.toString())
    if (post) {
        state.post = post
        if (comments) state.comments = comments
    }
})
</script>

<style scoped>

</style>