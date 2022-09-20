<template>
    <div class="container h-full flex flex-col">
        <div class="relative border rounded p-2">
            <n-tabs default-value="recommand" justify-content="center" animated tab-style="margin-right: 2rem"
                :on-update:value="onChange">
                <n-tab name="recommand" class="mr-2">
                    推荐
                </n-tab>
                <n-tab name="hot">
                    热门
                </n-tab>
                <n-tab name="latest">
                    最新
                </n-tab>
            </n-tabs>
            <button
                class="absolute top-1 right-1 bg-purple-400 text-white border-none hover:bg-purple-500 active:bg-purple-400 focus:outline-none"
                @click="router.push('/create')">发帖子</button>
        </div>
    </div>
</template>

<script setup lang="ts">import { useRouter } from 'vue-router';

const router = useRouter();
const onChange = (value: string) => {
    console.log(value);

}
</script>

<style lang="scss" scoped>

</style>