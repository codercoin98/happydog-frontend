// 导入axios实例
import httpRequest from '@/request/index'

export function getAllUser() {
    return httpRequest({
        url: 'api/user/findAll',
        method:'get',
        headers:{
            'Content-Type': 'application/json'
        }
    })
}