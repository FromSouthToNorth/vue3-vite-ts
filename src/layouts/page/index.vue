<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageLayout',
})
</script>

<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        mode="out-in"
        appear
      >
        <KeepAlive>
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </transition>
    </template>
  </RouterView>
</template>
