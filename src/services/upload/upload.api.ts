// 导入axios实例
import httpRequest from '@/request/index'
//长传post图片
export function uploadImage(formData: FormData) {
  return httpRequest({
    url: '/api/upload/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}
