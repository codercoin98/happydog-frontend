<script setup lang="ts">
const userInfo = {
    username: '',
    password: ''
}
</script>
<template>
    <div class="h-full flex flex-1 flex-col  justify-center">
        <div class="w-1/2 mx-auto px-4">
            <router-link to="/">
                <span class="cursor-pointer hover:text-purple-400">
                    <el-icon size="20px">
                        <ArrowLeft />
                    </el-icon>
                </span>
            </router-link>
        </div>
        <el-form label-position="right" class="card w-1/2 mx-auto p-4 mt-2">
            <el-form-item required>
                <el-input v-model="userInfo.username" placeholder="Username" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="userInfo.password" placeholder="Password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="flex justify-between w-full">
                    <button class="bg-purple-400 text-white">Sign in</button>
                    <button class="bg-gray-200">No account ? Sign up</button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
</style>