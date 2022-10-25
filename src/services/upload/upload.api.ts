// 导入axios实例
import httpRequest from '@/request/index'
import { AxiosPromise } from 'axios'
//长传post图片
export function uploadImage(formData: FormData): AxiosPromise<{
  status: number
  url: string // 图片 src ，必须
  alt: string // 图片描述文字，非必须
  href: string
}> {
  return httpRequest({
    url: '/api/upload/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}
