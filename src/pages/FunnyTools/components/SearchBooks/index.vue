<template>
    <div class="flex flex-col h-max mt-20">
        <p class="text-center font-bold text-lg">
            <icon-book />谷歌图书检索
        </p>
        <div class="flex items-center mt-10">
            <a-select v-model="state.type" :style="{width: '10rem'}" class="mr-2" placeholder="类型" size="large">
                <a-option value="books">书籍</a-option>
                <a-option value="magazines">杂志</a-option>
            </a-select>
            <a-input v-model="state.key" size="large" class="h-full" placeholder="Input any things you want know"
                allow-clear />
            <button
                class="w-1/5 ml-2 text-white bg-purple-400 hover:border-purple-500 hover:bg-purple-500 focus:outline-none"
                @click="getGoogleBooks">搜索</button>
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