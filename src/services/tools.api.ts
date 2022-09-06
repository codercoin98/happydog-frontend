// 导入axios实例
import httpRequest from '@/request/index'

// 获取验证码
export function getGithubProfile(username: string) {
  return httpRequest({
    url: `https://api.github.com/users/${username}`,
    method: 'get',
  })
}