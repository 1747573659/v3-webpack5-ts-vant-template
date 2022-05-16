export type LoginName = string
export type NumberOrNull = number | null
export type UserInfo = {
  loginName: LoginName,
  token: string,
  loginItemType: NumberOrNull,
  shopAdminId: NumberOrNull
}