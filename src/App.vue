<script lang="ts" setup>
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'ant-design-vue'
</script>

<template>
  <ConfigProvider>
    <RouterView />
  </ConfigProvider>
</template>
