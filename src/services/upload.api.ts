// 导入axios实例
import httpRequest from '@/request/index'
//注册
export function uploadImage(formData: FormData) {
  console.log(formData)

  return httpRequest({
    url: '/api/upload/image',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  })
}
