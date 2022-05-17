import { inject } from 'vue'
import { withdrawDetailRep } from '@/api/types';

export default () => {
  return inject<withdrawDetailRep>('withdrawDetailInfo')
}