import NP from 'number-precision'
export function formatYuanAmount(val: string) {
  return NP.round(val, 2)
    .toFixed(2)
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
