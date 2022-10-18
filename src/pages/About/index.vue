<template>
    <div class="container h-full flex flex-col space-y-4">
        <top-bar>
            <template #title>
                <span class="text-lg">关于本站</span>
            </template>
        </top-bar>
        <div class="border rounded-lg p-4 space-y-4">
            <p class="text-lg border-b">本站历程</p>
            <n-timeline>
                <n-timeline-item content="开发中" :time="dayjs().format('YYYY-MM-DD H:mm')" />
                <n-timeline-item type="info" title="立项" time="2018-04-03 20:46" line-type="dashed" />
            </n-timeline>
        </div>
        <div class="border rounded-lg p-4 space-y-4">
            <p class="text-lg border-b">联系方式</p>
            <ul class="space-y-4">
                <li>
                    <n-space class="flex items-center">
                        <n-icon size="20">
                            <QqOutlined />
                        </n-icon>
                        1015761882
                    </n-space>
                </li>
                <li>
                    <a href="https://github.com/coderlcb" class="no-underline text-black">
                        <n-space class="flex items-center">
                            <n-icon size="20">
                                <Github />
                            </n-icon>
                            Codercoin
                        </n-space>
                    </a>
                </li>
                <li>
                    <a href="https://space.bilibili.com/164577534" class="no-underline text-black">哔哩哔哩</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import TopBar from '@/components/TopBar/index.vue';
import dayjs from '@/utils/day'
import { Github } from '@vicons/fa';
import { QqOutlined } from '@vicons/antd'
</script>

<style scoped>

</style>