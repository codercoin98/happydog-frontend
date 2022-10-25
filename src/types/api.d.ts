//用于声明更新和删除接口的返回结果
export interface UpdateResult {
  acknowledged: boolean
  modifiedCount: number
  upsertedId: string | null
  upsertedCount: number
  matchedCount: number
}
export interface DeleteResult {
  acknowledged: boolean
  deletedCount: number
}
