<script setup>
import Table from "@/components/Table.vue";
import { onMounted, ref, unref } from "vue";
import TagFormDialog from "@/pages/admin/video/components/TagFormDialog.vue";
import { getTags } from "@/service/tags.js";

const columns = ref([
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
  },
  { slotName: "operation", title: "operation" },
]);
const refTagFormDialog = ref();
const tags = ref([]);

onMounted(() => {
  loadTags();
});

async function loadTags() {
  const res = await getTags();
  if (!res.ok) return;
  tags.value = res.data;
}

function editTag(record) {
  unref(refTagFormDialog).open(record.id);
}
</script>

<template>
  <div class="text-right"><a-button @click="editTag">添加</a-button></div>
  <Table :columns="columns" :data-source="tags">
    <template #operation="{ record }">
      <a-button
        type="link"
        @click="editTag(record)"
        style="color: var(--color-purple)"
        >编辑</a-button
      >
    </template>
  </Table>

  <TagFormDialog ref="refTagFormDialog"></TagFormDialog>
</template>

<style scoped lang="less"></style>
