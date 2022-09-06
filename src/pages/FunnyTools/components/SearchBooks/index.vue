<template>
    <div class="flex flex-col h-max mt-20">
        <p class="text-center">谷歌图书检索</p>
        <div class="flex items-center mt-10">
            <el-select v-model="state.type" class="m-2" placeholder="类型" size="large">
                <el-option value="books">书籍</el-option>
                <el-option value="magazines">杂志</el-option>
            </el-select>
            <el-input v-model="state.key" size="large" class="h-full" />
            <button class="w-1/5 ml-2" @click="getGoogleBooks">搜索</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { getBooks } from '@/services/tools.api';
const state = reactive({
key: '',
type: ''
})
const getGoogleBooks = async () => {
const result = await getBooks(state.key, state.type);
console.log(result);

}
</script>

<style scoped>
</style>