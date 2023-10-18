import { onMounted, onUnmounted, ref } from 'vue'
import type { XY } from '/#/index'
import { useAppStoreWithOut } from '../store/modules/app'

export function useMouse(): XY {
  const appStore = useAppStoreWithOut()
  const x = ref<number>(0)
  const y = ref<number>(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
    appStore.setXY({
      x,
      y,
    })
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
