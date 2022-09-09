<template>
    <div class="container h-full flex flex-col justify-center items-center border rounded-lg">
        <!--top-->
        <div class="w-1/2 mx-auto py-4 items-center">
            <div class="flex items-center justify-center font-bold text-xl text-purple-400 mb-4">
                <icon-user-group size="40" />加入我们吧!
                <p>已经有{{state.userNumber}}位成员</p>
            </div>
            <icon-arrow-left size="24px"
                class="inline-block cursor-pointer hover:text-purple-500 hover:bg-gray-100 hover:rounded-md"
                @click="() => router.push({ path:'/sign-in'})" />

        </div>
        <div class="card w-1/2 mx-auto py-4">
            <a-form :model="state.commitInfo" :label-col-props="{span:0}" :wrapper-col-props="{span:24}"
                @submit="submit">
                <a-form-item field="username"
                    :rules="[{required:true,message:'用户名不能为空！'},{minLength:6,message:'最小长度为6'},{maxLength:20,message:'最大长度为20'}]">
                    <a-input v-model="state.commitInfo.username" placeholder="用户名" />
                </a-form-item>
                <a-form-item field="password"
                    :rules="[{required:true,message:'密码不能为空！'},{minLength:8,message:'最小长度为8'},{maxLength:25,message:'最大长度为25'}]">
                    <a-input type="password" v-model="state.commitInfo.password" placeholder="密码" autocomplete="off" />
                </a-form-item>
                <a-form-item field="rePassword"
                    :rules="[{required:true,message:'重复密码不能为空！'},{match:new RegExp(`${state.commitInfo.password}`),message:'必须和上次输入的密码保持一致！'}]">
                    <a-input type="password" v-model="state.commitInfo.rePassword" placeholder="重复密码"
                        autocomplete="off" />
                </a-form-item>
                <a-form-item field="captcha">
                    <div class="flex flex-1">
                        <a-input type="text" v-model="state.commitInfo.captcha" placeholder="验证码" />
                        <span v-html="state.captcha" @click="genCaptcha"></span>
                    </div>
                </a-form-item>
                <a-form-item>
                    <button html-type="submit" class="w-full  text-white border-none  focus:outline-none"
                        :disabled="!noNull"
                        :class="{'bg-purple-400 hover:bg-purple-500': noNull,' bg-gray-400  hover:cursor-not-allowed': !noNull}">注册
                    </button>
                </a-form-item>
                <a-form-item>
                    <div class="text-center w-full">
                        <a-checkbox label="agree" v-model="agree">注册代表您同意<a href="#" class="underline w-">用户协议</a>
                        </a-checkbox>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCaptcha, signUp } from '@/services/auth.api';
import { getAllUser } from '@/services/user.api';
import { ref, reactive, onMounted, getCurrentInstance, computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const internalInstance = getCurrentInstance();
const agree = ref(false);
const state = reactive({
    userNumber: 0,
    captcha: '',
    commitInfo: {
        username: '',
        password: '',
        rePassword: '',
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
    getAllUser().then(res => {
        console.log(res);
        state.userNumber = res.length;
    })
})
const noNull: ComputedRef<boolean> = computed(() => {
    return state.commitInfo.username !== '' && state.commitInfo.password !== '' && state.commitInfo.captcha !== '' && agree.value === true
})
</script>

<style lang="scss" scoped>

</style>