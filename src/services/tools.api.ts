// 导入axios实例
import httpRequest from '@/request/index'

// 检索Github用户
export function getGithubProfile(username: string) {
  return httpRequest({
    url: `https://api.github.com/users/${username}`,
    method: 'get',
  })
}
// 检索谷歌图书
export function getBooks(key: string, printType: string) {
  return httpRequest({
    url: '/google/books/v1/volumes',
    method: 'get',
    params: {
      q: key,
      printType: printType,
      key: 'AIzaSyDAZifecaNAzFMRu0YMFuBM51v92O0bUrc',
    },
  })
}
