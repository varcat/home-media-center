<script setup>
const props = defineProps({
  dataSource: Array,
  columns: Array,
});
</script>

<template>
  <a-table :dataSource="dataSource" :columns="columns" :bordered="false" />
</template>

<style scoped lang="less"></style>
