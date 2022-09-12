<template>
    <div>
        <tinymce-editor :id="props.id" :value="props.value" :init="props.init" :witdh="props.width"
            :height="props.height" :resize="props.resize" :disabled="props.disabled" @input="props.onInput" />
    </div>
</template>

<script setup lang="ts">
import tinymce from 'tinymce/tinymce'
import TinymceEditor from '@tinymce/tinymce-vue'
const props = defineProps({
    id: String,
    value: String,
    init: Object,
    width: [String, Number],
    height: [String, Number],
    resize: [String, Number],
    disabled: Boolean,
    onInput: Function
})
</script>

<style scoped>

</style>