import transfer from '@/assets/img/transfer.png'
import recharge from '@/assets/img/recharge.png'
import deposit from '@/assets/img/deposit.png'
import payment from '@/assets/img/payment.png'
import refund from '@/assets/img/refund.png'
type _detailItem = {
  key: string,
  label: string | ((key:string) => string),
}
type detailList = {
  refundTime:_detailItem,
  createTime:_detailItem,
  paymentTime:_detailItem,
  depositTime:_detailItem,
  accountName:_detailItem,
  incomeBankNo:_detailItem,
  rechargeTime:_detailItem,
  transferTime:_detailItem,
  payeeId:_detailItem,
  refundSerialNumber:_detailItem,
  partnerRefundSerialNo:_detailItem,
  serialNumber:_detailItem,
  partnerSerialNumber:_detailItem,
  platformStateNumber:_detailItem,
  remark:_detailItem,
}
type _billTypeItem = {
  key: string,
  label: string,
  isAdd?: boolean,
  src?: string,
  detailList?: Array<_detailItem>
}
type billType = {
  all:_billTypeItem
  transfer:_billTypeItem
  recharge:_billTypeItem
  deposit:_billTypeItem
  payment:_billTypeItem
  refund:_billTypeItem
}
const detailListEnum:detailList =  {
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
    key: 'depositTime',
    label: '提现成功时间'
  },
  accountName: {
    key: 'accountName',
    label: '账户名'
  },
  incomeBankNo: {
    key: 'incomeBankNo',
    label: '到账银行卡'
  },
  rechargeTime: {
    key: 'rechargeTime',
    label: '充值成功时间'
  },
  transferTime: {
    key: 'transferTime',
    label: '转账成功时间'
  },
  payeeId: {
    key: 'payeeId',
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
    key: 'serialNumber',
    label: '平台流水号'
  },
  partnerSerialNumber: {
    key: 'partnerSerialNumber',
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
//  MYTODO: 转账、小程序支付类型需区分收款方、付款方、是否合并详情
export const billTypeEnum:billType = {
  all: {
    key: 'all',
    label: '全部账单'
  },
  transfer: {
    key: 'transfer',
    label: '转账',
    isAdd: false,
    src: transfer,
    detailList: [detailListEnum.transferTime, detailListEnum.payeeId, detailListEnum.serialNumber, detailListEnum.partnerSerialNumber, detailListEnum.remark]
  },
  recharge: {
    key: 'recharge',
    label: '充值',
    isAdd: true,
    src: recharge,
    detailList: [detailListEnum.rechargeTime, detailListEnum.serialNumber,detailListEnum.remark]
  },
  deposit: {
    key: 'deposit',
    label: '提现',
    isAdd: false,
    src: deposit,
    detailList: [detailListEnum.depositTime, detailListEnum.accountName, detailListEnum.incomeBankNo, detailListEnum.serialNumber, detailListEnum.remark]
  },
  payment: {
    key: 'payment',
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
  },
  refund: {
    key: 'refund',
    label: '小程序退款',
    isAdd: true,
    src: refund,
    detailList: [detailListEnum.refundTime, detailListEnum.payeeId, detailListEnum.refundSerialNumber, detailListEnum.partnerRefundSerialNo, detailListEnum.remark]
  }
}