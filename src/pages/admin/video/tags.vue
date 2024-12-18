<script setup>
import Table from "@/components/Table.vue";
import { onMounted, ref, unref } from "vue";
import TagFormDialog from "@/pages/admin/video/components/TagFormDialog.vue";
import { deleteTag, getTags } from "@/service/tags.js";

const columns = ref([
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
  },
  { slotName: "operation", title: "operation", width: 150 },
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

async function onDelTag(record) {
  await deleteTag(record.id);
  await loadTags();
}
</script>

<template>
  <div class="text-right mb-16">
    <a-button type="primary" @click="editTag">Add Tag</a-button>
  </div>
  <Table :columns="columns" :data-source="tags">
    <template #operation="{ record }">
      <a-button type="link" @click="editTag(record)">编辑</a-button>
      <a-button type="link" @click="onDelTag(record)" danger>删除</a-button>
    </template>
  </Table>

  <TagFormDialog ref="refTagFormDialog" @refresh="loadTags"></TagFormDialog>
</template>

<style scoped lang="less"></style>
