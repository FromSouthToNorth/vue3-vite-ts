<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { watch } from 'vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import type { item } from '/#/index'

import { useAppSetting } from '/@/hooks/useAppSetting'

const { getBook, getXY } = useAppSetting()

watch(
  () =>
    getBook.value,
  (val) => {
    console.log('watch book: ', val.name, val.list)
  },
  { deep: true },
)

watch(
  () => getXY.value,
  (val) => {
    console.log('watch x: %d, y: %d', val.x, val.y)
  },
)

function change(list: Array<item>) {
  console.log(list)
}
</script>

<template>
  <HelloWorld msg="Mouse position is at: " @change="change" />
</template>
