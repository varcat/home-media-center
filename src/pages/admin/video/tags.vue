<script setup>
import Table from "@/components/Table.vue";
import { ref, unref } from "vue";
import TagFormDialog from "@/pages/admin/video/components/TagFormDialog.vue";

const columns = ref([]);
const refTagFormDialog = ref();

function editTag() {
  unref(refTagFormDialog).open();
}
</script>

<template>
  <div class="text-right"><a-button @click="editTag">添加</a-button></div>
  <Table :columns="columns" />

  <TagFormDialog ref="refTagFormDialog"></TagFormDialog>
</template>

<style scoped lang="less"></style>
