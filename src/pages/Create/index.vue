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
                {{loading ? '发布中':'发布'}}
            </button>
        </div>
        <div class="p-4 border rounded-lg space-y-2">
            <n-input type="text" placeholder="标题" clearable maxlength="30" show-count v-model:value="title" />
            <Editor ref="editorRef" />
            <n-select placeholder="请选择社区发布" multiple :max-tag-count="5" v-model:value="category" :options="options" />
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
import Editor from '@/components/BaseEditor/index.vue'
import { ChevronLeft } from '@vicons/fa'
import { rules } from '@/constants/system'
import { createPost } from '@/services/post/post.api';
import { useLoadingBar } from 'naive-ui';
const router = useRouter()
const userStore = useUserStore()
const loadingbar = useLoadingBar()
const editorRef = ref()
const category = ref<string[] | null>(null)
const title = ref<string>('')
const loading = ref<boolean>(false)
const options = [
    {
        label: '日常交流',
        value: 'common',
    },
    {
        label: '游戏攻略',
        value: 'game',
    },
    {
        label: '游戏资讯',
        value: 'news',
    },
    {
        label: '版务公告',
        value: 'notice',
    },
]
//提交表单
const submit = async () => {
    if (!title.value) {
        window.$message.warning('标题不能为空')
        return
    }
    if (!editorRef?.value?.content) {
        window.$message.warning('内容不能为空')
        return
    }
    if (!category.value) {
        window.$message.warning('请选择发布的社区')
        return
    }
    if (userStore.userInfo?._id) {
        try {
            loadingbar.start()
            loading.value = true
            const { data } = await createPost({
                title: title.value,
                content: editorRef?.value?.content,
                author_id: userStore.userInfo?._id,
                categories: category.value!
            })
            if (data) {
                loadingbar.finish()
                loading.value = false
                window.$message.success('发布成功~')
                router.push(`/post/${data._id}`)
            }
            loadingbar.finish()
            loading.value = false
        } catch (error) {
            loadingbar.error()
            loading.value = false
        }

    }


}
</script>

<style scoped>

</style>