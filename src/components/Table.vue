<script setup>
const props = defineProps({
  dataSource: Array,
  columns: Array,
});
</script>

<template>
  <a-table :dataSource="dataSource" :columns="columns" :bordered="false">
    <template #bodyCell="{ column, record, index, text }">
      <slot
        :name="column.slotName"
        :column="column"
        :record="record"
        :index="index"
        :text="text"
      />
    </template>
  </a-table>
</template>

<style scoped lang="less"></style>
