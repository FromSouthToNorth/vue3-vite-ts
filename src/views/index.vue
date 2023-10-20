<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { watch } from 'vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import type { item } from '/#/index'

import { useAppSetting } from '/@/hooks/useAppSetting'

const { getBook } = useAppSetting()

watch(
  () =>
    getBook.value,
  (val) => {
    console.warn('watch book: ', val.name, val.list)
  },
  { deep: true },
)

function change(list: Array<item>) {
  console.info('change: ', list)
}
</script>

<template>
  <HelloWorld msg="Mouse position is at: " @change="change" />
</template>
