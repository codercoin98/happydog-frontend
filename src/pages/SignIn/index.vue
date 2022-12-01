<template>
  <div class="container h-full flex flex-col justify-center items-center border rounded-lg">
    <div class="card w-1/2 mx-auto py-4">
      <n-form ref="formRef" :model="authInfo" :rules="rules">
        <n-form-item path="username">
          <n-input v-model:value="authInfo.username" placeholder="用户名" />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            type="password"
            :input-props="{ autocomplete: 'off' }"
            show-password-on="mousedown"
            v-model:value="authInfo.password"
            placeholder="密码"
          />
        </n-form-item>
        <n-form-item>
          <div class="flex justify-between w-full">
            <n-spin :show="loading" class="w-full">
              <button
                :disabled="authInfo.username === null && authInfo.password === null"
                @click="submit"
                class="w-full primary-btn"
              >
                登录
              </button>
            </n-spin>
          </div>
        </n-form-item>
        <n-form-item>
          <a
            class="text-black hover:cursor-pointer hover:border-purple-400 focus:outline-none"
            @click="router.push({ path: '/sign-up' })"
            >没有账户？去注册
            <n-icon>
              <ArrowRight />
            </n-icon>
          </a>
        </n-form-item>
        <n-form-item>
          <div class="text-center w-full">
            <n-checkbox v-model:checked="agree" class="checked:bg-purple-400"
              >登录代表您同意
              <router-link to="/help" class="underline">用户协议 </router-link>
            </n-checkbox>
          </div>
        </n-form-item>
      </n-form>
    </div>
    <div class="w-1/2 mx-auto py-4 items-center">
      <a href="/" class="text-black hover:text-black">
        <div class="text-center p-1 mb-2 border rounded-lg hover:bg-gray-100">
          <n-icon>
            <Github />
          </n-icon>
          Github登录
        </div>
      </a>
      <a href="/" class="text-black hover:text-black">
        <div class="text-center p-1 mb-2 border rounded-lg hover:bg-gray-100">
          <n-icon>
            <Weixin />
          </n-icon>
          微信登录
        </div>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { FormInst, FormRules } from 'naive-ui'
import { Github, Weixin, ArrowRight } from '@vicons/fa'
import { md5 } from '@/utils/crypt'
import { signin } from '@/services/auth/auth.api'

const userStore = useUserStore()
const router = useRouter()
const formRef = ref<FormInst | null>(null)
const agree = ref(false)
const loading = ref(false)
const authInfo = reactive<{
  username: string
  password: string
}>({
  username: '',
  password: '',
})
//表单规则
const rules: FormRules = {
  username: [
    {
      required: true,
      validator(rule, value: string) {
        if (!value) {
          return new Error('用户名不能为空！这是你独特的标志！')
        } else if (value.length < 8) {
          return new Error('长度不能小于8个字符！')
        } else if (value.length > 18) {
          return new Error('长度不能大于18个字符！')
        }
        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空，就像每个人都需要秘密！',
    },
  ],
}
//登录
const submit = (e: MouseEvent): void => {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (agree.value === false) {
        window.$message.warning('请勾选用户协议，你可以把这看作是一个象征性的流程。')
        return
      }
      loading.value = true
      try {
        const { data } = await signin({
          username: authInfo.username,
          password: md5(authInfo.password),
        })
        //登录成功
        if (data && data.access_token) {
          //保存access_token到pinia
          userStore.access_token = data.access_token
          //获取用户信息
          userStore.getUser()
          window.$message.success('登录成功')
          loading.value = false
          router.push('/')
          return
        }
      } catch (error) {
        //登录不成功
        loading.value = false
      }
    }
  })
}
</script>
<style scoped></style>
