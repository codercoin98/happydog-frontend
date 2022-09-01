<template>
    <div class="h-full flex flex-1 flex-col">
        <!--top-->
        <div class="w-1/2 mx-auto py-4 mt-10 items-center">
            <div class="text-center font-bold text-xl mb-4">Join Us !</div>
            <router-link to="/">
                <el-icon size="24px"
                    class="inline-block cursor-pointer hover:text-purple-400 hover:bg-gray-100 hover:rounded-md">
                    <ArrowLeft />
                </el-icon>
            </router-link>
        </div>
        <el-form label-position="right" class="card w-1/2 mx-auto py-4">
            <el-form-item required>
                <el-input v-model="userInfo.username" placeholder="Your username" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="userInfo.password" placeholder="Your password" autocomplete="off" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="userInfo.rePassword" placeholder="Confirm your password"
                    autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-input type="text" v-model="userInfo.captcha" /><span v-html="state.captcha"></span>
            </el-form-item>
            <el-form-item>
                <button class="bg-purple-400 w-full text-white border-none hover:bg-purple-500 focus:outline-none">Sign
                    Up
                </button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">import { getCaptcha } from '@/services/user.api';
const state = reactive({
    captcha: ''
})
const userInfo = reactive({
    username: '',
    password: '',
    rePassword: '',
    captcha: '',
})
const genCaptcha = async () => {
    await getCaptcha().then((res: string) => {
        if (res) {
            state.captcha = res;
        }
    });
}
onMounted(() => {
    genCaptcha();
})
</script>

<style lang="scss" scoped>
</style>