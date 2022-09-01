<script setup lang="ts">
const userInfo = {
    username: '',
    password: ''
}
</script>
<template>
    <div class="h-full flex flex-1 flex-col">
        <!--top-->
        <div class="w-1/2 mx-auto py-4 mt-10 items-center">
            <router-link to="/" >
                <el-icon size="24px" class="inline-block cursor-pointer hover:text-purple-400 hover:bg-gray-100 hover:rounded-md">
                    <ArrowLeft />
                </el-icon>
            </router-link>
        </div>
        <el-form label-position="right" class="card w-1/2 mx-auto py-4">
            <el-form-item required>
                <el-input v-model="userInfo.username" placeholder="Username" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="userInfo.password" placeholder="Password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="flex justify-between w-full">
                    <button class="bg-purple-400 text-white border-none hover:bg-purple-500 focus:outline-none">Sign in</button>
                    <button class="bg-gray-200 hover:border-purple-400 focus:outline-none">No account ? Sign up</button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
</style>