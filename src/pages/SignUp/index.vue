<template>
    <div class="container h-full flex flex-col justify-center items-center border rounded-lg">
        <!--top-->
        <div class="w-1/2 mx-auto py-4 items-center">
            <div class="flex items-center justify-center font-bold text-xl text-purple-400 mb-4">
                <n-icon size="30">
                    <Users />
                </n-icon>加入我们吧!
                <p>已经有{{state.userNumber}}位成员</p>
            </div>
            <n-icon size="24">
                <ArrowLeft class="inline-block cursor-pointer hover:text-purple-500 hover:bg-gray-100 hover:rounded-md"
                    @click="() => router.push({ path:'/sign-in'})" />
            </n-icon>
        </div>
        <div class="card w-1/2 mx-auto py-4">
            <n-form ref="formRef" :model="state.formModel" :rules="rules">
                <n-form-item path="username">
                    <n-input v-model:value="state.formModel.username" placeholder="用户名" />
                </n-form-item>
                <n-form-item path="password">
                    <n-input type="password" :input-props="{ autocomplete: 'off' }" show-password-on="mousedown"
                        v-model:value="state.formModel.password" placeholder="密码" />
                </n-form-item>
                <n-form-item path="rePassword">
                    <n-input type="password" :input-props="{ autocomplete: 'off' }" show-password-on="mousedown"
                        :disabled="state.formModel.password === '' " v-model:value="state.formModel.rePassword"
                        placeholder="重复密码" />
                </n-form-item>
                <n-form-item path="captcha">
                    <div class="flex flex-1">
                        <n-input type="text" v-model:value="state.formModel.captcha" placeholder="验证码" />
                        <span v-html="state.captcha" @click="refreshCaptcha"></span>
                    </div>
                </n-form-item>
                <n-form-item>
                    <n-spin :show="loading" class="w-full">
                        <button @click="submit" class="w-full  text-white border-none  focus:outline-none"
                            :disabled="!noNull"
                            :class="{'bg-purple-400 hover:bg-purple-500': noNull,' bg-gray-400  hover:cursor-not-allowed': !noNull}">注册
                        </button>
                    </n-spin>

                </n-form-item>
                <n-form-item>
                    <div class="text-center w-full">
                        <n-checkbox v-model:checked="agree">注册代表您同意<a href="#" class="underline w-">用户协议</a>
                        </n-checkbox>
                    </div>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, ComputedRef } from 'vue';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode';
import { getCaptcha, signUp } from '@/services/auth.api';
import { getAllUser } from '@/services/user.api';
import { Users, ArrowLeft } from '@vicons/fa'
import { FormInst, FormItemRule, FormRules, useMessage } from 'naive-ui';
import { Token } from '../SignIn/types';
import { md5 } from '@/utils/crypt';
const router = useRouter()
const userStore = useUserStore()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const agree = ref<boolean>(false);
const loading = ref<boolean>(false);
const state = reactive<SIGN_IN.State>({
    userNumber: 0,
    captcha: '',
    formModel: {
        username: '',
        password: '',
        rePassword: '',
        captcha: '',
    }
})
//表单规则
const rules: FormRules = {
    username: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('用户名不能为空！这是你独特的标志！')
                } else if (value.length < 8) {
                    return new Error('长度不能小于8个字符！')
                } else if (value.length > 18) {
                    return new Error('长度不能大于18个字符！')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value) {
                    return new Error('密码不能为空，就像每个人都需要秘密！')
                } else if (value.length < 10) {
                    return new Error('长度不能小于10个字符！')
                } else if (value.length > 18) {
                    return new Error('长度不能大于18个字符！')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    rePassword: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (value !== state.formModel.password) {
                    return new Error('请保持密码一致，正如坚持自己的初心！')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    captcha: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (value.length !== 4) {
                    return new Error('验证码只有4位')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ]
}
const refreshCaptcha = () => {
    getCaptcha().then(({ data }) => {
        if (data) {
            state.captcha = data;
        }
    })
}
//初始化界面信息
const init = () => {
    Promise.all([getCaptcha(), getAllUser()]).then((values) => {
        state.captcha = values[0].data;
        state.userNumber = values[1].data.length;
    })
}
// 提交注册
const submit = async () => {
    formRef.value?.validate(async errors => {
        if (!errors) {
            const commitInfo = {
                username: state.formModel.username!,
                password: md5(state.formModel.password!),
                captcha: state.formModel.captcha!,
            }
            loading.value = true
            signUp(commitInfo).then(({ data }) => {
                if (data && data.access_token) {
                    message.success('注册成功！欢迎加入我们！')
                    const decode: Token = jwt_decode(data.access_token)
                    //持久化
                    localStorage.setItem('token', data.access_token);
                    //保存token,username到pinia
                    userStore.access_token = data.access_token;
                    userStore.username = decode.username;
                    router.push('/');
                    loading.value = false
                    return
                }
                loading.value = false
            }).catch(() => {
                loading.value = false
            })
        }
    })

}
onMounted(async () => {
    init();
})
const noNull: ComputedRef<boolean> = computed(() => {
    return state.formModel.username !== '' && state.formModel.password !== '' && state.formModel.captcha !== '' && agree.value === true
})
</script>

<style lang="scss" scoped>

</style>