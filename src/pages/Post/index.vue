<template>
  <div class="container space-y-4">
    <!--顶部-->
    <div class="flex justify-between items-center">
      <span
        class="flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200 hover:text-purple-400"
        @click="router.back()"
      >
        <n-icon size="20">
          <ChevronLeft />
        </n-icon>
      </span>
      <span class="lg:text-lg md:text-sm font-bold">帖子</span>
      <n-popover trigger="click" placement="bottom-center">
        <template #trigger>
          <span
            class="flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200 hover:text-purple-400"
          >
            <n-icon size="18" class="cursor-pointer hover:text-purple-400">
              <EllipsisH />
            </n-icon>
          </span>
        </template>
        <div class="w-32 py-2">
          <p class="py-2 w-full text-center cursor-pointer hover:bg-gray-100">举报</p>
          <p
            v-if="state.post?.author[0]._id === userStore.userInfo?._id"
            class="py-2 w-full text-center cursor-pointer hover:bg-gray-100"
            @click="deletePost"
          >
            删除
          </p>
        </div>
      </n-popover>
    </div>
    <!--帖子信息-->
    <div class="border rounded-lg px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-2">
          <n-avatar round :src="state.post?.author[0].avatar_url" :size="50" />
          <div class="">
            <p class="lg:text-lg">{{ state.post?.author[0].nickname }}</p>
            <p class="text-gray-400">发布于{{ dayjs(state.post?.created_at).fromNow() }}</p>
          </div>
        </div>
      </div>
      <!--标题-->
      <p class="lg:text-lg border-l-4 border-gray-300 pl-2 font-semibold text-ellipsis">
        {{ state.post?.title }}
      </p>
      <!--内容-->
      <div class="py-2" v-html="state.post?.content"></div>
      <div class="text-gray-400 space-x-2 py-2">
        <n-tag v-for="item in state.post?.categories">
          {{ item }}
        </n-tag>
      </div>
      <div class="flex justify-between border-t py-1">
        <button
          @click.stop=""
          class="flex-1 flex justify-center items-center py-2 rounded-lg border-none bg-transparent hover:border-none hover:bg-gray-100 hover:text-purple-400 focus:outline-none"
        >
          <n-icon size="18">
            <HeartRegular />
          </n-icon>
        </button>
        <button
          @click.stop=""
          class="flex-1 flex justify-center items-center py-2 rounded-lg border-none bg-transparent hover:border-none hover:bg-gray-100 hover:text-purple-400 focus:outline-none"
        >
          <n-icon size="18">
            <CommentDotsRegular />
          </n-icon>
        </button>
        <button
          @click.stop=""
          class="flex-1 flex justify-center items-center py-2 rounded-lg border-none bg-transparent hover:border-none hover:bg-gray-100 hover:text-purple-400 focus:outline-none"
        >
          <n-icon size="18">
            <ShareSquareRegular />
          </n-icon>
        </button>
      </div>
    </div>
    <!--评论区-->
    <div class="space-y-4">
      <!--标题-->
      <p class="lg:text-lg font-semibold">
        评论
        <span class="text-gray-400">{{ state.comments.length }}</span>
      </p>
      <!--输入区域-->
      <div v-if="userStore.access_token" class="flex space-x-2">
        <n-input
          type="textarea"
          rows="3"
          autofocus
          maxlength="1000"
          show-count
          placeholder="贴主期待你的评论~"
          class="flex-1 rounded-lg"
          v-model:value="state.commentInput"
        />
        <button
          class="py-2 px-4 rounded-lg bg-purple-500 border-none text-white hover:bg-purple-400 focus:outline-none active:bg-purple-500"
          @click="submitComment"
        >
          发送
        </button>
      </div>
      <div v-else class="text-center font-semibold text-lg">登录后进行评论</div>
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
                <a href="/#" class="text-black">{{ item.user[0].nickname }}</a>
              </div>
              <!--内容-->
              <div class="py-2 break-words">
                {{ item.content }}
              </div>
              <!--操作-->
              <div class="flex justify-between items-center h-10">
                <div class="flex items-center space-x-4">
                  <p>{{ dayjs(item.created_at).fromNow() }}</p>
                  <span class="flex items-center space-x-1">
                    <n-icon class="cursor-pointer hover:text-purple-500">
                      <HeartRegular />
                    </n-icon>
                    <p>{{ item.like }}</p>
                  </span>
                  <p class="text-gray-500 cursor-pointer" @click="handleReplyClick(item, 1)">
                    回复
                  </p>
                </div>
                <!--举报、删除-->
                <n-popover trigger="click" placement="bottom-center">
                  <template #trigger>
                    <span
                      class="invisible group-hover:visible flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200 hover:text-purple-400"
                    >
                      <n-icon size="18" class="cursor-pointer hover:text-purple-400">
                        <EllipsisH />
                      </n-icon>
                    </span>
                  </template>
                  <div class="w-32 py-2">
                    <p class="py-2 w-full text-center cursor-pointer hover:bg-gray-100">举报</p>
                    <p
                      v-if="item.user[0]._id === userStore.userInfo?._id"
                      class="py-2 w-full text-center cursor-pointer hover:bg-gray-100"
                      @click="deleteComment(item._id)"
                    >
                      删除
                    </p>
                  </div>
                </n-popover>
              </div>
            </div>
            <!--回复-->
            <ul v-if="item.reply_list && item.reply_list.length > 0" class="pl-14">
              <li
                v-for="item2 in item.reply_list"
                :key="item2._id"
                class="relative py-2 group pl-12"
              >
                <n-avatar
                  round
                  :src="item2.user[0]?.avatar_url"
                  :size="40"
                  class="absolute left-1 top-0"
                />
                <div class="inline-flex items-center flex-wrap space-x-2 h-min-10">
                  <div class="float-right font-sans break-words space-x-2">
                    <div class="inline-flex items-center">
                      <a href="/#" class="text-black">{{ item2.user[0]?.nickname }}</a>
                    </div>
                    <span v-if="item2.reply_to_reply_id">回复</span>
                    <a href="/#" v-if="item2.reply_to_reply_id" class="bg-transparent"
                      >@{{ item2.reply_to_user[0]?.nickname }}</a
                    >
                    <span> : </span>
                    {{ item2.content }}
                  </div>
                </div>
                <div class="flex justify-between items-center h-10">
                  <div class="flex items-center space-x-4">
                    <p>{{ dayjs(item2.created_at).fromNow() }}</p>
                    <span class="flex items-center space-x-1">
                      <n-icon class="cursor-pointer hover:text-purple-500">
                        <HeartRegular />
                      </n-icon>
                      <p>{{ item2.like }}</p>
                    </span>
                    <p class="text-gray-500 cursor-pointer" @click="handleReplyClick(item2, 2)">
                      回复
                    </p>
                  </div>
                  <n-popover trigger="click" placement="bottom-center">
                    <template #trigger>
                      <span
                        class="invisible group-hover:visible flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200 hover:text-purple-400"
                      >
                        <n-icon size="18" class="cursor-pointer hover:text-purple-400">
                          <EllipsisH />
                        </n-icon>
                      </span>
                    </template>
                    <div class="w-32 py-2">
                      <p class="py-2 w-full text-center cursor-pointer hover:bg-gray-100">举报</p>
                      <p
                        v-if="item2.user[0]._id === userStore.userInfo?._id"
                        class="py-2 w-full text-center cursor-pointer hover:bg-gray-100"
                        @click="deleteReply(item2._id, item2.reply_to_comment_id)"
                      >
                        删除
                      </p>
                    </div>
                  </n-popover>
                </div>
              </li>
            </ul>
            <!--回复框-->
            <div
              v-if="
                state.replyInputVisible &&
                (state.replyTarget?._id === item._id ||
                  (state.replyTarget as REPLY_API.ReplyFull)?.reply_to_comment_id === item._id)
              "
            >
              <p v-if="userStore.access_token === ''">请登录后操作</p>
              <div v-else class="flex space-x-2 pl-14">
                <n-input
                  type="textarea"
                  rows="3"
                  autofocus
                  round
                  maxlength="1000"
                  show-count
                  :placeholder="`回复：@${state.replyTarget?.user[0].nickname}`"
                  class="flex-grow"
                  v-model:value="state.replyInput"
                />
                <button
                  class="py-2 px-4 rounded-lg flex-shrink-0 bg-purple-500 border-none text-white hover:bg-purple-400 focus:outline-none active:bg-purple-400"
                  @click="submitReply"
                >
                  发送
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ChevronLeft,
  EllipsisH,
  HeartRegular,
  CommentDotsRegular,
  ShareSquareRegular,
} from '@vicons/fa'
import { PostFull } from '../Home/types'
import dayjs from '@/utils/day'
import { useUserStore, usePostStore } from '@/store'
import { createComment, deleteCommentById } from '@/services/comment/comment.api'
import { useDialog, useLoadingBar } from 'naive-ui'
import { createReply, deleteReplyById } from '@/services/reply/reply.api'
import { deletePostById } from '@/services/post/post.api'
import { changeToCategory } from '@/utils/format'
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const postStore = usePostStore()
const loadingBar = useLoadingBar()
const dialog = useDialog()
interface State {
  post: PostFull | null
  comments: COMMENT_API.CommentFull[]
  commentInput: string | null
  replyInput: string | null
  replyInputVisible: boolean
  replyTarget: COMMENT_API.CommentFull | REPLY_API.ReplyFull | null
  replyTargetType: number | null
}
const state = reactive<State>({
  post: null,
  comments: [],
  commentInput: null,
  replyInput: null,
  replyInputVisible: false,
  replyTarget: null,
  replyTargetType: null,
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
      user_id: userStore.userInfo!._id!,
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
const submitReply = async () => {
  if (!state.replyInput) {
    window.$message.warning('不能发送空评论！')
    return
  }
  if (state.replyTarget) {
    try {
      loadingBar.start()
      const { data } = await createReply({
        post_id: state.replyTarget.post_id,
        content: state.replyInput,
        user_id: userStore.userInfo?._id!,
        reply_to_user_id: state.replyTarget.user[0]._id,
        reply_to_comment_id:
          state.replyTargetType === 1
            ? state.replyTarget._id
            : (state.replyTarget as REPLY_API.ReplyFull).reply_to_comment_id,
        reply_to_reply_id: state.replyTargetType === 2 ? state.replyTarget._id : undefined,
      })
      if (data && data.length > 0) {
        loadingBar.finish()
        window.$message.success('回复已提交')
        state.replyInput = null
        state.comments = state.comments.map((e) => {
          if (
            e._id === state.replyTarget?._id ||
            e._id === (state.replyTarget as REPLY_API.ReplyFull)?.reply_to_comment_id
          ) {
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
      state.comments = state.comments.filter((item) => {
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
      state.comments = state.comments.map((item) => {
        if (item._id === comment_id) {
          item.reply_list = item.reply_list.filter((e) => {
            return e._id !== reply_id
          })
        }
        return item
      })
      return
    }
    loadingBar.finish()
    window.$message.error('删除失败！')
  } catch (error) {
    console.log(error)
    loadingBar.error()
    return
  }
}
//删除帖子
const deletePost = async () => {
  const DeleteDialog = dialog.info({
    title: '警告',
    content: '你确定要删除该帖子吗？',
    positiveText: '确定',
    positiveButtonProps: {
      color: '#8a2be2',
      textColor: '#8a2be2',
      focusable: false,
    },
    negativeText: '取消',
    negativeButtonProps: {
      color: '#000000',
      textColor: 'gray',
      bordered: false,
      focusable: false,
    },
    showIcon: false,
    closable: false,
    onPositiveClick: async () => {
      try {
        loadingBar.start()
        const { data } = await deletePostById(state.post!._id)
        if (data.deletedCount === 1) {
          loadingBar.finish()
          window.$message.success('操作成功')
          DeleteDialog.destroy()
          router.push('/home')
          return
        }
      } catch (error) {
        loadingBar.error()
        window.$message.error('操作失败')
      }
    },
    onNegativeClick: () => {},
  })
}
//控制回复点击,type为1时是回复顶级评论，为2是回复子评论
const handleReplyClick = (target: COMMENT_API.CommentFull | REPLY_API.ReplyFull, type: number) => {
  if (!userStore.access_token) {
    window.$message.warning('请先登录')
    return
  }
  state.replyTargetType = type
  if (target === state.replyTarget) {
    state.replyInputVisible = !state.replyInputVisible
    return
  }
  state.replyInputVisible = true
  state.replyTarget = target
}
onMounted(async () => {
  const post = await postStore.getPostById(route.params.post_id.toString())
  const comments = await postStore.getComments(route.params.post_id.toString())
  if (post) {
    state.post = post
    state.post.categories = changeToCategory(post.categories)
    if (comments) state.comments = comments
  }
})
</script>

<style>
.n-input-wrapper {
  resize: none !important;
}
</style>
