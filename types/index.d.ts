import type { Ref } from 'vue'

export interface item {
  key: string
  value: number
}

export interface Book {
  name?: string
  list?: Array<item>
}

export interface XY {
  x?: Ref<number>
  y?: Ref<number>
}
