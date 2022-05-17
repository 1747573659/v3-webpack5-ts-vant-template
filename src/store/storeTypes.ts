export type LoginName = string
export type NumberOrNull = number | null
export type UserInfo = {
  loginName: LoginName,
  token: string,
  loginItemType: number,
  shopAdminId: number,
  walletId: string,
  openId: string
}
type Wallet = {
  walletId: string,
  shortShopName: string
}
export type WalletList = Wallet[]
export type WalletListInfo = {
  walletList: WalletList
}