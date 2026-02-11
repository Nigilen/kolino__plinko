<script lang="ts" setup>
import { data } from '@/data';
</script>

<template>
  <h1 class="title">{{ data.title }}</h1>
</template>

<style lang="css" scoped>
.title {
  font-size: min(60px, 10vmin);
  text-align: center;
  margin-block: 0;
  line-height: 1;
}
</style>