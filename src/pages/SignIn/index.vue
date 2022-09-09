<script setup lang="ts">
import { reactive } from 'vue';

const userInfo = reactive({
username: '',
password: ''
})
</script>
<template>
    <div class="container h-full flex items-center border rounded-lg">
        <div class="card w-1/2 mx-auto py-4">
            <a-form :model="userInfo" :label-col-props="{span:0}" :wrapper-col-props="{span:24}">
                <a-form-item>
                    <a-input v-model="userInfo.username" placeholder="Username" />
                </a-form-item>
                <a-form-item>
                    <a-input type="password" v-model="userInfo.password" placeholder="Password" autocomplete="off" />
                </a-form-item>
                <a-form-item>
                    <div class="flex justify-between w-full">
                        <button class="bg-purple-400 text-white border-none hover:bg-purple-500 focus:outline-none">Sign
                            in</button>
                        <router-link to="/sign-up"><button
                                class="bg-gray-200 text-black hover:border-purple-400 focus:outline-none">No account
                                ? Sign up</button></router-link>
                    </div>
                </a-form-item>
            </a-form>
        </div>

    </div>
</template>
<style scoped>
</style>