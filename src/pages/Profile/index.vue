<template>
    <div class="container h-full flex flex-col space-y-2">
        <div class="text-center font-semibold lg: text-lg">个人资料</div>
        <div class="flex pb-4 border-b justify-between items-center">
            <!--left-->
            <div class="flex">
                <n-image :src="userStore.userInfo?.avatar_url" width="100" class=" border-4 border-purple-200" />
                <div class="flex flex-col ml-4">
                    <p class="text-black font-semibold lg:text-xl">{{userStore.userInfo?.nickname}}</p>
                    <p class="text-gray-300 font-semibold lg:text-lg">@{{userStore.userInfo?.username}}</p>
                    <p>{{userStore.userInfo?.bio}}</p>
                </div>
            </div>
            <!--right-->
            <div class="w-1/2 h-full flex flex-col justify-between items-end">
                <n-modal v-model:show="isShow">
                    <n-card style="width: 600px" title="编辑信息" :bordered="false" size="huge" role="dialog"
                        aria-modal="true">
                        <template #header-extra>
                            <button class="rounded-full bg-black text-white w-20">确认</button>
                        </template>
                        <div class="space-y-4">
                            <!--头像上传-->
                            <n-upload :show-file-list="false" :custom-request="customUpload">
                                <n-image :src="userStore.userInfo?.avatar_url" width="100" preview-disabled
                                    class=" border-4 border-purple-200" />
                            </n-upload>
                            <!--其他修改-->
                            <n-input round placeholder="昵称" show-count maxlength="18"
                                :default-value="userStore.userInfo?.nickname" :v-model:value="editModalForm.nickname" />
                            <n-input round placeholder="自我介绍" show-count maxlength="50"
                                :v-model:value="editModalForm.bio" />
                        </div>
                    </n-card>
                </n-modal>
                <button
                    class="block rounded-full w-24 border border-gray-400 bg-transparent font-semibold hover:border-gray-400 hover:bg-gray-100"
                    @click="isShow = true">编辑</button>
                <div class="space-x-4">
                    <span class="text-base text-neutral-500 ">
                        关注：
                        {{userStore.userInfo?.following}}
                    </span>
                    <span class="text-base text-neutral-500">
                        粉丝：
                        {{userStore.userInfo?.follower}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useUserStore } from '@/store';
import { UploadCustomRequestOptions } from 'naive-ui/es/upload';
const userStore = useUserStore()
const isShow = ref<boolean>(false)
const editModalForm = reactive({
    avatar_url: '',
    nickname: userStore.userInfo?.nickname,
    bio: ''
})
const customUpload = (options: UploadCustomRequestOptions) => {
    console.log(options.file.file);

}
</script>