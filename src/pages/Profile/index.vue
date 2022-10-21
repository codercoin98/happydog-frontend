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
                            <button class="py-2 px-4 rounded-full bg-black text-white w-20" @click="confirm">确认</button>
                        </template>
                        <n-form ref="formRef" :model="editModalForm" :rules="rules">
                            <n-form-item path="avatar_url" label="头像">
                                <!--头像上传-->
                                <n-upload :show-file-list="false" :custom-request="customUpload" class="relative">
                                    <n-image v-model:src="editModalForm.avatar_url" width="100" preview-disabled
                                        class=" border-4 border-purple-200 cursor-pointer" />
                                </n-upload>
                            </n-form-item>
                            <n-form-item path="nickname" label="昵称">
                                <n-input round placeholder="起个很酷的名字吧！" show-count maxlength="18"
                                    v-model:value="editModalForm.nickname" />
                            </n-form-item>
                            <n-form-item path="bio" label="简介">
                                <n-input round placeholder="这家伙什么都没有写~" show-count maxlength="50"
                                    v-model:value="editModalForm.bio" />
                            </n-form-item>

                        </n-form>
                    </n-card>
                </n-modal>
                <button
                    class="block py-2 px-4 rounded-full w-24 border border-gray-400 bg-transparent font-semibold hover:border-gray-400 hover:bg-gray-100"
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
import { ref } from 'vue';
import { useUserStore } from '@/store';
import { UploadCustomRequestOptions } from 'naive-ui/es/upload';
import { uploadImage } from '@/services/upload/upload.api';
import { FormInst, FormRules, useLoadingBar } from 'naive-ui';
import { updateUserById } from '@/services/user/user.api';
const userStore = useUserStore()
const loadingBar = useLoadingBar()
const formRef = ref<FormInst | null>(null)
let isShow = ref<boolean>(false)
const rules: FormRules = {
    nickname: [
        {
            required: true, message: '昵称不能为空',
        }

    ]
}
const editModalForm = ref<USER_API.UpdateData>({
    avatar_url: userStore.userInfo?.avatar_url!,
    nickname: userStore.userInfo?.nickname!,
    bio: userStore.userInfo?.bio!
})
//上传头像
const customUpload = async (options: UploadCustomRequestOptions) => {
    if (options.file.file) {
        const formdata = new FormData()
        formdata.append('file', options.file.file)
        try {
            loadingBar.start()
            const { data } = await uploadImage(formdata)
            if (data && data.status === 201) {
                editModalForm.value.avatar_url = data.url
                loadingBar.finish()
                window.$message.success('头像上传成功！')
            }
        } catch (error) {
            loadingBar.error()
        }
    }
}
const confirm = async () => {
    formRef.value?.validate(async error => {
        if (!error) {
            try {
                loadingBar.start()
                const { data } = await updateUserById(userStore.userInfo?._id!, editModalForm.value)
                if (data) {
                    userStore.userInfo = data
                    loadingBar.finish()
                    isShow.value = false
                    window.$message.success('更新信息成功！')
                }
            } catch (error) {
                loadingBar.error()
            }
        }
    })

}
</script>