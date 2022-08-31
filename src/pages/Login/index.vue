<script setup lang="ts">
const userInfo = {
    username:'',
    password:''
}
</script>
<template>
    <div class="h-full flex flex-1 justify-center">
        <el-form label-position="right" class="card w-1/2 p-4 mt-10">
            <el-form-item label="Username" required>
                <el-input v-model="userInfo.username"/>
            </el-form-item>
            <el-form-item label="Password" required>
                <el-input type="password" v-model="userInfo.password" autocomplete="off"/>
            </el-form-item>
            <el-form-item>
                <button>Sign in</button><button>No account,Sign up</button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style scoped>
</style>