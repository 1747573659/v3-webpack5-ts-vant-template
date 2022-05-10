export type LoginName = string | null
export type NumberOrNull = number | null
export type UserInfo = {
  loginName: LoginName,
  token: string,
  loginType: NumberOrNull,
  shopAdminId: NumberOrNull
}