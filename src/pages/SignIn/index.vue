<script setup lang="ts">
const userInfo = reactive({
    username: '',
    password: ''
})
</script>
<template>
    <div class="container h-1/2 flex items-center border rounded-lg">
        <!--top-->
        <el-form label-position="right" class="card w-1/2 mx-auto py-4">
            <el-form-item required>
                <el-input v-model="userInfo.username" placeholder="Username" />
            </el-form-item>
            <el-form-item required>
                <el-input type="password" v-model="userInfo.password" placeholder="Password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <div class="flex justify-between w-full">
                    <button class="bg-purple-400 text-white border-none hover:bg-purple-500 focus:outline-none">Sign
                        in</button>
                    <router-link to="/sign-up"><button class="bg-gray-200 text-black hover:border-purple-400 focus:outline-none">No account
                            ? Sign up</button></router-link>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
</style>