<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { watch } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import type { Book, XY, item } from '/#/index'

import { useAppSetting } from './hooks/useAppSetting'

const { getBook, getXY } = useAppSetting()

watch(() => getBook.value, (val) => {
  console.log('watch book: ', val)
})

watch(() => getXY.value, (val) => {
  console.log('watch xy: ', val)
})

function change(list: Array<item>) {
  console.log(list)
}
</script>

<template>
  <HelloWorld msg="Mouse position is at: " @change="change" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
