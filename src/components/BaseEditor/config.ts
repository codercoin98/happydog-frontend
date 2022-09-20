import { IToolbarConfig, IEditorConfig } from '@wangeditor/editor'
import { ImageElement } from './types'
import { useLoadingBar, useMessage } from 'naive-ui'
const loadingBar = useLoadingBar()
const message = useMessage()
//工具栏配置
export const toolbarConfig: Partial<IToolbarConfig> = {
  toolbarKeys: [
    'headerSelect',
    'bold',
    'italic',
    'fontSize',
    'color',
    'insertLink',
    'insertTable',
    'uploadImage',
    'emotion',
  ],
}
export const editorConfig: Partial<IEditorConfig> = {
  placeholder: '说点什么好呢？',
  autoFocus: true,
  MENU_CONF: {},
}
// 自定义校验图片
function customCheckImageFn(src: string, alt: string, url: string): boolean | undefined | string {
  // TS 语法
  // function customCheckImageFn(src, alt, url) {                                                    // JS 语法
  if (!src) {
    return
  }
  if (src.indexOf('http') !== 0) {
    return '图片网址必须以 http/https 开头'
  }
  return true

  // 返回值有三种选择：
  // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
  // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
  // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}

// 转换图片链接
function customParseImageSrc(src: string): string {
  // TS 语法
  // function customParseImageSrc(src) {               // JS 语法
  if (src.indexOf('http') !== 0) {
    return `http://${src}`
  }
  return src
}

// 插入图片
editorConfig.MENU_CONF!['insertImage'] = {
  onInsertedImage(imageNode: ImageElement | null) {
    if (imageNode == null) return
    const { src, alt, url, href } = imageNode
    console.log('inserted image', src, alt, url, href)
  },
  checkImage: customCheckImageFn, // 也支持 async 函数
  parseImageSrc: customParseImageSrc, // 也支持 async 函数
}
// 编辑图片
editorConfig.MENU_CONF!['editImage'] = {
  onUpdatedImage(imageNode: ImageElement | null) {
    // JS 语法
    if (imageNode == null) return

    const { src, alt, url } = imageNode
    console.log('updated image', src, alt, url)
  },
  checkImage: customCheckImageFn, // 也支持 async 函数
  parseImageSrc: customParseImageSrc, // 也支持 async 函数
}
editorConfig.MENU_CONF!['uploadImage'] = {
  server: '/api/uploadImage',
  meta: {
    token: '',
  },
  fieldName: 'image',
  maxFileSize: 1 * 1024 * 1024,
  maxNumberOfFiles: 9,
  allowedFileTypes: ['image/*'],
  timeout: 5000,
  onProgress(progress: number) {
    console.log('progress', progress)
    loadingBar.start()
  },
  // 单个文件上传成功之后
  onSuccess(file: File, res: any) {
    console.log(`${file.name} 上传成功`, res)
    loadingBar.finish()
    message.success('上传成功！')
  },
  // 单个文件上传失败
  onFailed(file: File, res: any) {
    console.log(`${file.name} 上传失败`, res)
    loadingBar.error()
    message.error('上传失败！')
  },
  // 上传错误，或者触发 timeout 超时
  onError(file: File, err: any, res: any) {
    console.log(`${file.name} 上传出错`, err, res)
    loadingBar.error()
    message.error('上传失败！')
  },
}
