<template>
    <div class="container space-y-2">
        <div class="flex justify-between items-center">
            <span
                class="flex items-center justify-center p-1 rounded hover:cursor-pointer hover:bg-gray-200  hover:text-purple-400"
                @click="router.back()">
                <n-icon size="20">
                    <ChevronLeft />
                </n-icon>
            </span>
            <span class="lg:text-lg md:text-sm font-bold">发布帖子</span>
            <button @click="submit"
                class="w-24 h-10 border-none bg-purple-400 text-white hover:bg-purple-500 active:bg-purple-400 focus:outline-none">
                发布
            </button>
        </div>
        <div class="p-4 border rounded-lg">
            <n-input type="text" placeholder="标题" clearable maxlength="30" show-count v-model:value="title" />
            <Editor ref="editorRef" />
        </div>
        <div class="container border rounded-lg p-4">
            <n-list>
                <template #header>
                    <div class="font-semibold">发帖注意事项：</div>
                </template>
                <n-list-item v-for="(item,index) in rules">
                    <template #prefix>
                        {{index+1}}.
                    </template>
                    {{item}}
                </n-list-item>
            </n-list>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import { useMessage } from 'naive-ui';
import Editor from '@/components/BaseEditor/index.vue'
import { ChevronLeft } from '@vicons/fa'
import { rules } from '@/constants/system'
import { createPost } from '@/services/post/post.api';
const router = useRouter()
const userStore = useUserStore()
const message = useMessage()
const editorRef = ref()
const title = ref<string>('')

//提交表单
const submit = async () => {
    if (!title.value) {
        message.warning('标题不能为空')
        return
    }
    if (userStore.userInfo?._id) {
        const { data } = await createPost({
            title: title.value,
            content: editorRef?.value?.content,
            author_id: userStore.userInfo?._id
        })
        if (data) {
            window.$message.success('发布成功~')
            router.push(`/post/:${data._id}`)
        }
    }


}
</script>

<style scoped>

</style>