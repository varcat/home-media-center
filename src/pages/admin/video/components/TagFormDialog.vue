<script setup>
import { computed, onMounted, ref, unref } from "vue";
import Form from "@/components/Form.vue";
import { message } from "ant-design-vue";
import { addOrEditTag, getTags } from "@/service/tags.js";

const emits = defineEmits(["refresh"]);

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
  ];
});

defineExpose({
  open,
});

async function loadTags() {
  const res = await getTags();
  if (!res.ok) return;
  tags.value = res.data;
}

async function onSubmit() {
  const [err, data] = await unref(refForm).validate();
  if (err) return;
  if (unref(editId)) {
    data.id = unref(editId);
  }
  const res = await addOrEditTag(data);
  if (!res.ok) return;
  emits("refresh");
  onClose();
  message.open({
    type: "success",
    content: "Add Success",
  });
}

async function open(id) {
  modalVisible.value = true;
  await loadTags();
  if (id) {
    editId.value = id;
    const tag = unref(tags).find((t) => t.id === id);
    formData.value = {
      name: tag.name,
    };
  }
}

function onClose() {
  unref(refForm).resetFields();
  editId.value = null;
  formData.value = {};
  modalVisible.value = false;
}
</script>

<template>
  <a-modal
    title="Edit Tag"
    v-model:open="modalVisible"
    @ok="onSubmit"
    @cancel="onClose"
  >
    <Form
      v-model:data="formData"
      ref="refForm"
      :fields="fields"
      :label-col="{ span: 4 }"
    />
  </a-modal>
</template>

<style scoped lang="less"></style>
