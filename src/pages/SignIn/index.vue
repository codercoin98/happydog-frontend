<template>
    <div class="container h-full flex flex-col justify-center items-center border rounded-lg">
        <div class="card w-1/2 mx-auto py-4">
            <a-form :model="userInfo" :label-col-props="{span:0}" :wrapper-col-props="{span:24}" @submit="submit">
                <a-form-item field="username"
                    :rules="[{required:true,message:'用户名不能为空！'},{minLength:6,message:'最小长度为6'},{maxLength:20,message:'最大长度为20'}]">
                    <a-input v-model="userInfo.username" placeholder="用户名" />
                </a-form-item>
                <a-form-item field="password"
                    :rules="[{required:true,message:'密码不能为空！'},{minLength:8,message:'最小长度为8'},{maxLength:25,message:'最大长度为25'}]">
                    <a-input type="password" v-model="userInfo.password" placeholder="密码" autocomplete="off" />
                </a-form-item>
                <a-form-item>
                    <div class="flex justify-between w-full">
                        <button html-type="submit"
                            class="w-full bg-purple-400 text-white border-none hover:bg-purple-500 focus:outline-none">登录</button>
                    </div>
                </a-form-item>
                <a-form-item>
                    <a class=" text-black hover:cursor-pointer hover:border-purple-400 focus:outline-none"
                        @click="router.push({path:'/sign-up'})">没有账户？去注册
                        <icon-double-right />
                    </a>
                </a-form-item>
                <a-form-item>
                    <div class="text-center w-full">
                        <a-checkbox label="agree" v-model="agree">登录代表您同意<router-link to="/help" class="underline">用户协议
                            </router-link>
                        </a-checkbox>
                    </div>
                </a-form-item>
            </a-form>
        </div>
        <div class="w-1/2 mx-auto py-4 items-center">
            <a href="/" class="text-black hover:text-black ">
                <div class="text-center p-1 mb-2 border rounded-lg hover:bg-gray-100">
                    <icon-github />
                    Github登录
                </div>
            </a>
            <a href="/" class="text-black hover:text-black ">
                <div class="text-center p-1 mb-2 border rounded-lg hover:bg-gray-100">
                    <icon-wechat />
                    微信登录
                </div>
            </a>

        </div>
    </div>
</template>
<script setup lang="ts">
import { getCurrentInstance, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const internalInstance = getCurrentInstance();
const agree = ref(false)
const userInfo = reactive({
    username: '',
    password: ''
})
//登录
const submit = () => {
    if (userInfo.username !== '' && userInfo.password !== '' && agree.value === true) {
        internalInstance?.appContext.config.globalProperties.$message.success('success');
    }
    internalInstance?.appContext.config.globalProperties.$message.error('failure');
    return
}
</script>
<style scoped>

</style>