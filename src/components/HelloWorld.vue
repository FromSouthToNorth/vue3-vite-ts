<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { shuffle as _shuffle } from 'lodash-es'
import { v4 as v4_uuid } from 'uuid'
import { useMouse } from '../utils/mouse'
import type { Book, item } from '/#/index'
import { useAppStore } from '../store/modules/app'
import { formatToDateTime } from '../utils/dateUtil'

const props = defineProps<Props>()

/** withDefaults set props defaults */
// const props = withDefaults(defineProps<Props>(), {
//   msg: 'xxx',
// })

const emits = defineEmits<{
  change: [list: Array<item>]
}>()

const appStore = useAppStore()

const { x, y } = useMouse()
interface Props {
  msg: string
}

interface textColor {
  text: string
  color: string
}

function defaultList(): Array<item> {
  const list: Array<item> = []
  for (let i = 0; i < 5; i++) {
    list.push({
      key: v4_uuid(),
      value: i,
    })
  }
  return list
}

const author = reactive<Book>({
  name: 'John Doe',
  list: defaultList(),
})
// 一个计算属性 ref
const publishedBooksMessage = computed<textColor>(() => {
  return author.list.length
    ? { text: 'Yes', color: '#52c41a' }
    : { text: 'No', color: '#f5222d' }
})

const disabled = ref<boolean>(false)

function getRandom(min: number, max: number): number {
  const floatRandom = Math.random()
  const diff = max - min
  const random = Math.round(diff * floatRandom)
  return random + min
}

function push() {
  const { list } = author
  let max = 0
  if (list.length) {
    list.forEach(({ value }) => {
      max = Math.max(value, max)
    })
  }
  else {
    max = 33
  }
  const random = getRandom(-max, 10000)
  list.push({
    key: v4_uuid(),
    value: random,
  })
}

watch(
  () => author.list,
  (val) => {
    appStore.setBook(author)
    emits('change', val)
  },
  { deep: true },
)

const time = ref<string>('')
const timeout = ref<NodeJS.Timeout | null>(null)

function getTime() {
  timeout.value = setInterval(() => {
    time.value = formatToDateTime(new Date())
  }, 1000)
}

onMounted(() => {
  getTime()
})

function reset() {
  author.list = defaultList()
}
function pop() {
  const { list } = author
  if (!list.length) {
    disabled.value = true
    setTimeout(() => {
      disabled.value = false
    }, 1500)
  }
  else {
    list.pop()
  }
}

function sort() {
  const { list } = author
  // quickSort(list, 0, list.length - 1)
  for (let i = 1; i < list.length; i++) {
    const min = list[i]
    let j = i - 1
    while (j >= 0 && list[j].value > min.value) {
      list[j + 1] = list[j]
      j--
    }
    list[j + 1] = min
  }
}

/** 快速排序 时间复杂度: O(n log n)最坏时间复杂度: O(n2) / 空间复杂度: O(n)  */
function quickSort(a: Array<number>, lo: number, hi: number) {
  if (hi <= lo)
    return
  const j = partition(a, lo, hi)
  quickSort(a, lo, j - 1)
  quickSort(a, j + 1, hi)
}
function partition(a: Array<number>, lo: number, hi: number): number {
  let i = lo
  let j = hi + 1
  const t = a[lo]
  while (true) {
    while (less(a[++i], t)) {
      if (i === hi)
        break
    }

    while (less(t, a[--j])) {
      if (j === lo)
        break
    }

    if (i >= j)
      break
    exch(a, i, j)
  }
  exch(a, lo, j)
  return j
}
function exch(a: Array<number>, i: number, j: number) {
  const t = a[i]
  a[i] = a[j]
  a[j] = t
}
function less(a: number, b: number): boolean {
  return a < b
}
/***/

function shuffle() {
  author.list = _shuffle(author.list)
}

function liOnClick(_key: string) {
  const i = author.list.findIndex(({ key }) => {
    return key === _key
  })
  if (i > -1)
    author.list.splice(i, 1)
}

const closeIndex = ref<string | null>(null)

function onMouseover(key: string) {
  closeIndex.value = key
}

function onMouseout() {
  closeIndex.value = null
}
</script>

<template>
  <div class="container">
    <h1 class="movearea" :style="{ backgroundImage: `linear-gradient(135deg,  hsl(${x}, 80%, 50%), hsl(${y}, 80%, 50%), hsl(${x + y}, 80%, 50%))` }">
      {{ time }}
    </h1>
    <h1 class="movearea" :style="{ backgroundImage: `linear-gradient(135deg,  hsl(${x}, 80%, 50%), hsl(${y}, 80%, 50%), hsl(${x + y}, 80%, 50%))` }">
      {{ msg }} {{ x }}, {{ y }}
    </h1>
    <div class="button-container">
      <button class="item-button" @click="push">
        push
      </button>
      <button class="item-button" :disabled="disabled" :class="{ shake: disabled }" type="button" @click="pop">
        pop
      </button>
      <button class="item-button" @click="reset">
        reset
      </button>
      <button class="item-button" @click="shuffle">
        shuffle
      </button>
      <button class="item-button" @click="sort">
        sort
      </button>
    </div>
    <p :style="{ margin: '4px' }">
      The list is not empty
    </p>
    <span class="publishedBooksMessage" :style="{ color: publishedBooksMessage.color }">{{ publishedBooksMessage.text }}</span>
    <TransitionGroup name="list" tag="ul" class="list-container">
      <li v-for="item in author.list" :key="item.key" class="item" @mouseover.stop="onMouseover(item.key)" @mouseout.stop="onMouseout">
        <span class="item-text">{{ item.value }}</span>
        <Transition name="fade">
          <span v-show="closeIndex === item.key" class="i-game-icons-cancel item-close" @click="liOnClick(item.key)" />
        </Transition>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto;
  max-width: 360px;
  font-family: JetBrains Mono;
}
.publishedBooksMessage {
  font-weight: 900;
}
.button-container {
  padding: 6px;
}
.item-button {
  font-size: 12px;
  background: #0070d5;
  color: #fff;
  margin: 2px 0;
}
.item-button:hover {
  background: #2490e3;
}
.item-button + .item-button {
  margin-left: 2px;
}
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  color: #d9d9d9;
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
.movearea {
  color: transparent;
  -webkit-background-clip: text;
  transition: 0.3s color ease;
}
.list-container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  position: relative;
  width: 20%;
  border-radius: 4px;
  transition: all 0.5s;
  height: 26px;
  line-height: 26px;
  font-size: 13px;
  cursor: pointer;
}
.item item-text {
  display: block;
  width: 100%;
}
.item:hover {
  color: #1890ff;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
  2px 2px 2px 0px rgba(0, 0, 0, .1),
  4px 4px 5px 0px rgba(0, 0, 0, .1);
}
.item-close {
  color: #ff7875;
  font-size: 13px;
  position: absolute;
  top: 2px;
  right: 2px;
}
.item-close:hover {
  color: #f5222d;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
</style>
