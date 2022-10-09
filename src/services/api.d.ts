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
