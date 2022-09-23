<template>
    <div>

    </div>
</template>

<script setup lang="ts">import { useMessage } from 'naive-ui';

/**
 * 该组件用于配合n-message-provider在非setup中调用message
*/
window.$message = useMessage();
</script>

<style scoped>

</style>