export type LoginName = string
export type NumberOrNull = number | null
export type UserInfo = {
  loginName: LoginName,
  token: string,
  loginItemType: NumberOrNull,
  shopAdminId: NumberOrNull
}
type Wallet = {
  walletId: string,
  shortShopName: string
}
export type WalletList = Wallet[]
export type WalletListInfo = {
  walletList: WalletList
}