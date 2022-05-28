import { Directive } from 'vue'
import router from '@/router/index'

// 当前自定义指令默认为路由名称和按钮名称(节点下的span标签内的文本)
// 可以自己定义按钮的值，
const btnStats: Directive = {
  beforeMount(el:Element, binding) {
    // 优先使用传入值
    const btnText = binding.value || el.querySelector('span')?.innerHTML
    el.addEventListener('click', () => {
      const routeName = router.currentRoute.value.meta.title || '';
      (window as any)._hmt.push(['_trackEvent', 'btn_click', routeName, btnText])
      console.log(`btn_click+${routeName}+${btnText}`)
    })
  }
}

export default btnStats