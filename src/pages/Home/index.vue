<template>
    <div class="container h-full flex flex-col">
        <div class="relative border rounded-lg p-2">
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

        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
const userStore = useUserStore();
const onChange = (value: string) => {
    console.log(value);

}
</script>

<style lang="scss" scoped>

</style>