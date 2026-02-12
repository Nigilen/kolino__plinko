<script lang="ts" setup>
import { mainConfig } from '@/config/mainConfig';
</script>

<template>
  <h1 class="title">{{ mainConfig.title }}</h1>
</template>

<style lang="css" scoped>
.title {
  font-size: min(82px, 10vmin);
  text-align: center;
  margin-block: 0;
  line-height: 1;
}
</style>