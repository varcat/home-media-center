<script setup>
import { computed, ref, unref } from "vue";
import Form from "@/components/Form.vue";

const open = ref(false);
const refForm = ref();
const formData = ref({});

const fields = computed(() => {
  return [
    {
      prop: "name",
      label: "Name",
    },
    {
      prop: "parentId",
      label: "Parent Tag",
      treeData: [],
    },
  ];
});

function onSubmit() {
  unref(refForm).validate();
}

defineExpose({
  open: () => {
    open.value = true;
  },
});
</script>

<template>
  <a-modal title="Edit Tag" v-model:open="open" @ok="onSubmit">
    <Form
      v-model:data="formData"
      ref="refForm"
      :fields="fields"
      :label-col="{ span: 4 }"
    />
  </a-modal>
</template>

<style scoped lang="less"></style>
