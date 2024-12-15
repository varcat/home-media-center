<script setup>
import { computed, onMounted, ref, unref } from "vue";
import Form from "@/components/Form.vue";
import { message } from "ant-design-vue";
import { addOrEditTag, getTags } from "@/service/tags.js";

const modalVisible = ref(false);
const refForm = ref();
const editId = ref();
const formData = ref({});
const tags = ref([]);

const fields = computed(() => {
  return [
    {
      prop: "name",
      label: "Name",
      required: true,
    },
    {
      prop: "parentId",
      label: "Parent Tag",
      treeData: [],
    },
  ];
});

onMounted(() => {
  loadTags();
});

defineExpose({
  open,
});

async function loadTags() {
  const res = await getTags();
  if (!res.ok) return;
  tags.value = res.data;
  if (unref(editId)) {
    const tag = tags.value.find((t) => t.id === unref(editId));
    formData.value = {
      name: tag.name,
      parentId: tag.parentId,
    };
  }
}

async function onSubmit() {
  const [err, data] = await unref(refForm).validate();
  if (err) return;
  if (unref(editId)) {
    data.id = unref(editId);
  }
  const res = await addOrEditTag(data);
  if (!res.ok) return;
  message.open({
    type: "success",
    content: "Add Success",
  });
}

function open(id) {
  modalVisible.value = true;
  if (id) {
    editId.value = id;
  }
}
</script>

<template>
  <a-modal title="Edit Tag" v-model:open="modalVisible" @ok="onSubmit">
    <Form
      v-model:data="formData"
      ref="refForm"
      :fields="fields"
      :label-col="{ span: 4 }"
    />
  </a-modal>
</template>

<style scoped lang="less"></style>
