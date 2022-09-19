<template>
    <div class="pt-10">
        <editor api-key="sqon0mf4ng4sz0twv67zjx2oj9bhjqhfo8o30qv03djpv4ja" cloud-channel="6" :inline="true"
            tag-name="div" :init="init" v-model="content" class="p-2 border-t focus:outline-none" />
        <div class="flex justify-end mt-2">
            <button @click="submit"
                class="w-1/6 border-none bg-purple-400 text-white hover:bg-purple-500 active:bg-purple-400 focus:outline-none">
                发布
            </button>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom'
//plugins
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/image'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/preview'
import { useMessage } from 'naive-ui'
const message = useMessage()
const init = {
    width: '100%',
    min_height: 400,
    max_height: 500,
    autoResize: true,
    resize: false,
    menubar: false,
    statusbar: true,
    content_css: 'writer',
    language: 'zh-Hans',
    language_url: '/tinymce/langs/zh-Hans.js',
    branding: false,
    plugins: ['lists', 'link', 'table', 'image', 'emoticons', 'preview', 'wordcount'],
    skin_url: '/tinymce/skins/ui/oxide',
    custom_ui_selector: 'body',
    paste_data_images: true,
    toolbar: 'code bold italic table image link emoticons copy preview ',
    //初始化聚焦
    init_instance_callback: (editor: any) => {
        editor.focus() // 初始化聚焦，让内联模式的编辑器工具显示
    },
    /**
    * 时间日期格式化
  */
    insertdatetime_formats: ['%H点%M分', '%Y年%m月%d日', '%Y年%m月%d日 %H点%M分', '%Y-%m-%d %H:%M'],

    // 默认使用base64格式
    images_upload_handler: function (blobInfo: any, success: any, failure: any) {
        const maxSize = 2
        const blob = blobInfo.blob()

        if (blob.size / 1024 / 1024 > maxSize) {
            failure('图片大小不能超过' + maxSize + 'MB')
            return
        }

        const formData = new FormData()
        formData.append('file', blob, blobInfo.fileName)
        //上传逻辑
    }
}
const content = ref<string>('')
const submit = () => {
    message.info(content.value)
}
onMounted(() => {
    tinymce.init({})
})
</script>

<style scoped>

</style>