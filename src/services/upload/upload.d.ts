declare namespace UPLAOD_API {
  export interface UploadResult {
    status: number
    url: string // 图片 src ，必须
    alt: string // 图片描述文字，非必须
    href: string
  }
}
