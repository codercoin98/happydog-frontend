<template>
    <div class="container h-1/2 flex flex-col items-center border rounded-lg">
        <!--top-->
        <div class="w-1/2 mx-auto py-4 mt-10 items-center">
            <div class="text-center font-bold text-xl mb-4">Join Us !</div>
            <router-link to="../">
                <el-icon size="24px"
                    class="inline-block cursor-pointer hover:text-purple-400 hover:bg-gray-100 hover:rounded-md">
                    <ArrowLeft />
                </el-icon>
            </router-link>
        </div>
        <el-form class="card w-1/2 mx-auto py-4">
            <el-form-item required>
                <el-input v-model="state.commitInfo.username" placeholder="Your username" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="state.commitInfo.password" placeholder="Your password"
                    autocomplete="off" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="state.commitInfo.rePassword" placeholder="Confirm your password"
                    autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="flex flex-1">
                    <el-input type="text" v-model="state.commitInfo.captcha" placeholder="captcha" />
                    <span v-html="state.captcha" @click="genCaptcha"></span>
                </div>
            </el-form-item>
            <el-form-item>
                <button class="bg-purple-400 w-full text-white border-none hover:bg-purple-500 focus:outline-none">Sign
                    Up
                </button>
            </el-form-item>
            <el-form-item>
                <div class="text-center w-full">
                    <el-checkbox label="agree" v-model="agree">已阅读<a href="#">用户协议</a>并同意该协议</el-checkbox>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">import { getCaptcha } from '@/services/user.api';
const agree = ref(false);
const state = reactive({
    captcha: '',
    commitInfo: {
        username: '',
        password: '',
        rePassword: '',
        captcha: '',
    }
})
const genCaptcha = async () => {
    await getCaptcha().then((res: any) => {
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