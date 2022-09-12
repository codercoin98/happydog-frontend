<template>
    <div class="container h-full flex flex-col pt-6 px-6 border rounded-lg">
        <div class="w-full border-bottom border-b-2">
            <icon-left size="24" />
        </div>
        <Editor api-key="your-api-key" cloud-channel="6" :disabled=true id="uuid" :init="{ }" initial-value="hello word"
            :inline=true model-events="" plugins="lists" tag-name="div" toolbar="" value="" />
    </div>
</template>

<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue';
</script>

<style scoped>

</style>