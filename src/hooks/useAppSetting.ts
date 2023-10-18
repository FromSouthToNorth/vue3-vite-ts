import { computed } from 'vue'
import { useAppStore } from '../store/modules/app'

export function useAppSetting() {
  const appStore = useAppStore()

  const getXY = computed(() => appStore.getXY)

  const getBook = computed(() => appStore.getBook)

  return {
    getXY,
    getBook,
  }
}
