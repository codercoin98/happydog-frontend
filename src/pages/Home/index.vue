<template>
    <div class="container h-full flex flex-col">
        <div class="p-2">
            <n-tabs type="line" default-value="recommand" justify-content="center" animated
                tab-style="margin-right: 2rem" :on-update:value="onChange">
                <n-tab name="recommand">
                    <p class="lg:text-lg">推荐</p>
                </n-tab>
                <n-tab name="hot">
                    <p class="lg:text-lg">热门</p>
                </n-tab>
                <n-tab name="latest">
                    <p class="lg:text-lg">最新</p>
                </n-tab>
            </n-tabs>

        </div>
    </div>
</template>

<script setup lang="ts">
const onChange = (value: string) => {
    console.log(value);
}
</script>

<style>

</style>