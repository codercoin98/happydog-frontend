<template>
    <div class="container h-full flex flex-col items-center border rounded-lg">
        <!--top-->
        <div class="w-1/2 mx-auto py-4 mt-10 items-center">
            <div class="text-center font-bold text-xl mb-4">Join Us !</div>
            <router-link to="../">
                <icon-arrow-left size="24px"
                    class="inline-block cursor-pointer hover:text-purple-400 hover:bg-gray-100 hover:rounded-md" />
            </router-link>
        </div>
        <div class="card w-1/2 mx-auto py-4">
            <a-form :model="state.commitInfo" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
                <a-form-item>
                    <a-input v-model="state.commitInfo.username" placeholder="Your username" />
                </a-form-item>
                <a-form-item>
                    <a-input type="password" v-model="state.commitInfo.password" placeholder="Your password"
                        autocomplete="off" />
                </a-form-item>
                <a-form-item>
                    <a-input type="password" v-model="state.rePassword" placeholder="Confirm your password"
                        autocomplete="off" />
                </a-form-item>
                <a-form-item>
                    <div class="flex flex-1">
                        <a-input type="text" v-model="state.commitInfo.captcha" placeholder="captcha" />
                        <span v-html="state.captcha" @click="genCaptcha"></span>
                    </div>
                </a-form-item>
                <a-form-item>
                    <button class="bg-purple-400 w-full  text-white border-none hover:bg-purple-500 focus:outline-none"
                        @click="submit" :disabled="haveNull" :class="{' hover:cursor-not-allowed': haveNull}">Sign
                        Up
                    </button>
                </a-form-item>
                <a-form-item>
                    <div class="text-center w-full">
                        <a-checkbox label="agree" v-model="agree">已阅读<a href="#">用户协议</a>并同意该协议</a-checkbox>
                    </div>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>

<script setup lang="ts">
import { getCaptcha, signUp } from '@/services/auth.api';
import { ref, reactive, onMounted, getCurrentInstance, computed, ComputedRef } from 'vue';
const internalInstance = getCurrentInstance();
const agree = ref(false);
const state = reactive({
    captcha: '',
    rePassword: '',
    commitInfo: {
        username: '',
        password: '',
        captcha: '',
    }
})
//获取验证码
const genCaptcha = async () => {
    await getCaptcha().then((res: any) => {
        if (res) {
            state.captcha = res;
        }
    });
}
// 提交注册
const submit = async () => {
    const result: any = await signUp(state.commitInfo);
    if (result.status === 200) {
        internalInstance?.appContext.config.globalProperties.$message.success('success');
        return
    }
    internalInstance?.appContext.config.globalProperties.$message.error('failure');
}
onMounted(() => {
    genCaptcha();
})
const haveNull: ComputedRef<boolean> = computed(() => {
    return state.commitInfo.username !== '' && state.commitInfo.password !== '' && state.commitInfo.captcha !== ''
})
</script>

<style lang="scss" scoped>

</style>