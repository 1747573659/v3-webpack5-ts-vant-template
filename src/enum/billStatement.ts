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
  counterpartInfoList?: counterpartInfoList
  [propName: string]: string | number | counterpartInfoList | null | undefined
}
type _billTypeItem = {
  key: string
  label: string
  isAdd?: boolean
  src?: string
  detailList: Array<_detailItem> | ((item: billDetailType) => Array<_detailItem>)
}

const detailListEnum = {
  refundTime: {
    key: 'refundTime',
    label: '退款成功时间'
  },
  createTime: {
    key: 'createTime',
    label: '创建时间'
  },
  paymentTime: {
    key: 'createTime',
    label: '支付成功时间'
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
      console.log(list.counterpartInfoList, 'list.counterpartInfoList')
      return list.counterpartInfoList.map(item => item.counterpartWalletId).join(',')
    },
    label: '对方钱包ID'
  },
  refundSerialNumber: {
    key: 'refundSerialNumber',
    label: '平台退款流水号'
  },
  partnerRefundSerialNo: {
    key: 'partnerRefundSerialNo',
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
    key: 'platformStateNumber',
    label: '平台明细单号'
  },
  remark: {
    key: 'remark',
    label: '备注'
  }
}

export const billTypeMapEnum = new Map([
  [
    -1,
    {
      key: -1,
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
      detailList: [
        detailListEnum.transferTime,
        detailListEnum.payeeId,
        detailListEnum.serialNumber,
        detailListEnum.partnerSerialNumber,
        detailListEnum.remark
      ]
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
      detailList: [
        detailListEnum.createTime,
        detailListEnum.paymentTime,
        detailListEnum.payeeId,
        detailListEnum.serialNumber,
        detailListEnum.partnerSerialNumber,
        detailListEnum.platformStateNumber,
        detailListEnum.remark
      ]
    }
  ],
  [
    5,
    {
      key: 5,
      label: '小程序退款',
      isAdd: true,
      src: refund,
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
//  MYTODO: 转账、小程序支付类型需区分收款方、付款方、是否合并详情
export function getBillItemList(info: billDetailType) {
  const { orderType, category } = info
  const currentItem: _billTypeItem = {
    ...(billTypeMapEnum.get(orderType) as unknown as _billTypeItem)
  }
  //  如果是函数-》 调用
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
  console.log(currentItem, 'currentItem')
}
const text = {
  amount: 600,
  balance: 1708.7,
  basicInfoId: 90000043,
  billNo: '90678465802545061888',
  category: 1,
  channelCode: '19',
  counterpartInfoList: [
    {
      counterpartWalletId: 'QB00065757000007',
      counterpartMchId: '226801000000519485168',
      counterpartShortShopName: '王一小卖部',
      counterpartBasicInfoId: 90000046
    }
  ],
  createDate: '2022-04-25 16:03:31',
  finishDate: '2022-04-25 16:02:09',
  mchId: '226801000000518110430',
  operatorName: '罗',
  orderType: 4,
  partnerId: null,
  partnerName: null,
  payMethod: 4,
  remark: '',
  scenes: null,
  shareFinishDate: '2022-04-25 15:07:39',
  shareStatus: 2,
  shopAdminId: 70,
  shopAdminName: '深圳市蒸食膳餐饮有限公司55',
  shortShopName: '许雄伯-商户简称',
  sn: '76678465733305491456',
  sourceType: null,
  status: 2,
  thirdSn: '7525898e-062b-4abb-abb4-50f2f0f97735',
  tradeNo: '202204432508342740',
  walletId: 'QB00065757000004',
  walletType: 1
}
getBillItemList(text)
