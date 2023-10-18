import { onMounted, onUnmounted, ref } from 'vue'
import type { RefXY } from '/#/index'
import { useAppStoreWithOut } from '../store/modules/app'

export function useMouse(): RefXY {
  const appStore = useAppStoreWithOut()
  const x = ref<number>(0)
  const y = ref<number>(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
    appStore.setXY({
      x: x.value,
      y: y.value,
    })
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
