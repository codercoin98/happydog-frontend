<template>
    <div class="pt-2">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor style="min-height: 120px" v-model="content" :defaultConfig="editorConfig" @onCreated="handleCreated" />
    </div>

</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { toolbarConfig, editorConfig } from './config'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const content = ref('')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
defineExpose({
    content
})
</script>

<style scoped>

</style>