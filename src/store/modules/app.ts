import { defineStore } from 'pinia'
import type { Book } from '/#/index'
import { store } from '/@/store'

interface XY {
  x: number
  y: number
}

interface AppState {
  xy: {
    x: number
    y: number
  }
  book: Book
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    xy: {
      x: 0,
      y: 0,
    },
    book: { name: '', list: [] },
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
