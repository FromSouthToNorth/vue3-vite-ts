import { defineStore } from 'pinia'
import type { Book, XY } from '/#/index'
import { ref } from 'vue'
import { store } from '/@/store'

interface AppState {
  xy: XY
  book: Book
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    xy: {
      x: ref(0),
      y: ref(0),
    },
    book: {},
  }),
  getters: {
    getXY(state): XY {
      return state.xy
    },
    getBook(state): Book {
      return state.book
    },
  },
  actions: {
    setXY(xy: XY): void {
      this.xy = xy
    },
    setBook(book: Book): void {
      this.book = book
    },
  },
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
