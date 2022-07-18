import transfer from '@/assets/img/transfer.png'
import recharge from '@/assets/img/recharge.png'
import deposit from '@/assets/img/deposit.png'
import payment from '@/assets/img/payment.png'
import refund from '@/assets/img/refund.png'
type counterpartInfoList = Array<{ counterpartWalletId: string }>
type _detailItem = {
  key: string | ((info: billDetailType) => string)
  label: string | number
  value?: any
}
export type billDetailType = {
  orderType: number
  category: number
  // counterpartInfoList?: counterpartInfoList
  [propName: string]: string | number | counterpartInfoList | null | undefined
}
type _billTypeItem = {
  key: string
  label: string
  isAdd?: boolean
  src?: string
  shortShopName?: boolean
  detailList: Array<_detailItem> | ((item: billDetailType) => Array<_detailItem>)
}
const bankMethodsMapEnum = new Map([
  [1, '余额'],
  [2, '网商活期'],
  [3, '非网商卡'],
  [4, '支付宝余额'],
  [5, '系统异常']
])
const detailListEnum = {
  refundTime: {
    key: 'finishDate',
    label: '退款成功时间'
  },
  createTime: {
    key: 'createDate',
    label: '创建时间'
  },
  paymentTime: {
    key: 'finishDate',
    label: '支付成功时间'
  },
  payMethod: {
    key: (info: { bankPayMethod: number }) => bankMethodsMapEnum.get(info.bankPayMethod),
    label: '银行支付方式'
  },
  depositTime: {
    key: 'finishDate',
    label: '提现成功时间'
  },
  accountName: {
    key: 'bankAccountName',
    label: '账户名'
  },
  incomeBankNo: {
    key: 'bankCardNo',
    label: '到账银行卡'
  },
  rechargeTime: {
    key: 'finishDate',
    label: '充值成功时间'
  },
  transferTime: {
    key: 'finishDate',
    label: '转账成功时间'
  },
  payeeId: {
    key: (list: { counterpartInfoList: counterpartInfoList }) => {
      return list.counterpartInfoList
        ? list.counterpartInfoList.map(item => item.counterpartWalletId).join(',')
        : ''
    },
    label: '对方ID'
  },
  refundSerialNumber: {
    key: 'refundSn',
    label: '平台退款流水号'
  },
  partnerRefundSerialNo: {
    key: 'refundThirdSn',
    label: '合作方退款流水号'
  },
  serialNumber: {
    key: 'sn',
    label: '平台流水号'
  },
  partnerSerialNumber: {
    key: 'thirdSn',
    label: '合作方流水号'
  },
  platformStateNumber: {
    key: 'detailSn',
    label: '平台明细单号'
  },
  remark: {
    key: 'remark',
    label: '备注'
  }
}

export const billTypeMapEnum = new Map<string | number, any>([
  [
    '',
    {
      key: '',
      label: '全部账单'
    }
  ],
  [
    4,
    {
      key: 4,
      label: '转账',
      isAdd: false,
      src: transfer,
      shortShopName: true,
      detailList(info: billDetailType){
        if (info.partnerId) {
          return [
            detailListEnum.transferTime,
            detailListEnum.payeeId,
            detailListEnum.serialNumber,
            detailListEnum.partnerSerialNumber,
            detailListEnum.remark
          ]
        } else {
          // 合作方id为空，不显示合作方流水
          return [
            detailListEnum.transferTime,
            detailListEnum.payeeId,
            detailListEnum.serialNumber,
            detailListEnum.remark
          ]
        }
      }
    }
  ],
  [
    3,
    {
      key: 3,
      label: '充值',
      isAdd: true,
      src: recharge,
      detailList: [detailListEnum.rechargeTime, detailListEnum.serialNumber, detailListEnum.remark]
    }
  ],
  //  ok
  [
    2,
    {
      key: 2,
      label: '提现',
      isAdd: false,
      src: deposit,
      detailList: [
        detailListEnum.depositTime,
        detailListEnum.accountName,
        detailListEnum.incomeBankNo,
        detailListEnum.serialNumber,
        detailListEnum.remark
      ]
    }
  ],
  [
    1,
    {
      key: 1,
      label: '小程序支付',
      isAdd: false,
      src: payment,
      shortShopName: true,
      detailList: (info: billDetailType) => {
        if (info.orderFlag === 1) {
          // 合并单
          if (info.category === 1) {
            // 收入
            return [
              detailListEnum.createTime,
              detailListEnum.paymentTime,
              detailListEnum.payeeId,
              detailListEnum.serialNumber,
              detailListEnum.partnerSerialNumber,
              detailListEnum.platformStateNumber,
              detailListEnum.remark
            ]
          } else {
            // 支出
            return [
              detailListEnum.createTime,
              detailListEnum.paymentTime,
              detailListEnum.payMethod,
              detailListEnum.payeeId,
              detailListEnum.serialNumber,
              detailListEnum.partnerSerialNumber,
              detailListEnum.platformStateNumber,
              detailListEnum.remark
            ]
          }
        } else {
          //  非合并
          if (info.category === 1) {
            // 收入
            return [
              detailListEnum.createTime,
              detailListEnum.paymentTime,
              detailListEnum.payeeId,
              detailListEnum.serialNumber,
              detailListEnum.partnerSerialNumber,
              detailListEnum.remark
            ]
          } else {
            // 支出
            return [
              detailListEnum.createTime,
              detailListEnum.paymentTime,
              detailListEnum.payMethod,
              detailListEnum.payeeId,
              detailListEnum.serialNumber,
              detailListEnum.partnerSerialNumber,
              detailListEnum.remark
            ]
          }
        }
      }
    }
  ],
  [
    5,
    {
      key: 5,
      label: '小程序退款',
      isAdd: true,
      src: refund,
      shortShopName: true,
      detailList: [
        detailListEnum.refundTime,
        detailListEnum.payeeId,
        detailListEnum.refundSerialNumber,
        detailListEnum.partnerRefundSerialNo,
        detailListEnum.remark
      ]
    }
  ]
])
export function getBillItemList(info: billDetailType) {
  const { orderType } = info
  const currentItem: _billTypeItem = {
    ...billTypeMapEnum.get(orderType)
  }
  if (typeof currentItem.detailList === 'function') {
    currentItem.detailList = currentItem.detailList(info)
  }
  if (currentItem.detailList) {
    currentItem.detailList =
      currentItem.detailList.map(item => {
        let value
        if (typeof item.key === 'function') {
          value = item.key(info)
        } else if (typeof item.key === 'string') {
          value = info[item.key]
        }
        return {
          value,
          label: item.label,
          key: item.key
        }
      }) || []
  }
  return currentItem
}
