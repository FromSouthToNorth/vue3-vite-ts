<script lang="ts">
import { defineComponent } from 'vue'
import PageLayout from '/@/layouts/page/index.vue'

export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout },
})
</script>

<template>
  <div class="content">
    <PageLayout />
  </div>
</template>
