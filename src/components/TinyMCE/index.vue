<template>
    <div class="pt-10">
        <editor api-key="sqon0mf4ng4sz0twv67zjx2oj9bhjqhfo8o30qv03djpv4ja" cloud-channel="6" :inline="true"
            tag-name="div" :init="init" class="p-4 focus:unoutline" />
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
import 'tinymce/plugins/image'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/emoticons'
const init = {
    width: '100%',
    min_height: 450,
    resize: false,
    placeholder: '说点什么吧',
    menubar: false,
    statusbar: true,
    content_css: 'writer',
    language: 'zh-CN',
    language_url: '/tinymce/langs/zh-Hans.js',
    branding: false,
    plugins: ['lists', 'link', 'image', 'wordcount'],
    skin_url: '/tinymce/skins/ui/oxide',
    custom_ui_selector: 'body',
    paste_data_images: true,
    toolbar: 'code bold italic table image emoticons copy preview ',
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
onMounted(() => {
    tinymce.init({})
})
</script>

<style scoped>

</style>