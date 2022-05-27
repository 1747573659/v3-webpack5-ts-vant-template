
import { computed } from 'vue'
import { useStore } from 'vuex'
export default () => {
  const store = useStore()
  const keyBoardShow = computed(() => store.state.keyBoardShow.keyBoardShow)
  return {
    keyBoardShow
  }
}