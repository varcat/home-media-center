<script setup>
import { ref, unref } from "vue";

const props = defineProps({
  fields: Array,
  data: {
    type: Object,
    default: () => ({}),
  },
  labelCol: {
    type: Object,
  },
});

const emits = defineEmits(["update:data"]);

const refForm = ref();

function onUpdateValue(field, evt) {
  emits("update:data", {
    ...unref(props.data),
    [field.prop]: evt,
  });
}

function resetFields() {
  unref(refForm).resetFields();
}

async function validate(nameList) {
  const data = await unref(refForm).validate(nameList);
  console.log(data);
}

defineExpose({
  resetFields,
  validate,
});
</script>

<template>
  <a-form :model="data" :label-col="labelCol" :ref="(r) => (refForm = r)">
    <a-form-item
      v-for="field of fields"
      :key="field.prop"
      :label="field.label"
      :name="field.prop"
    >
      <a-tree-select
        v-if="field.treeData"
        :value="data[field.prop]"
        @update:value="onUpdateValue(field, $event)"
        show-search
        allow-clear
        :tree-data="field.treeData"
        tree-node-filter-prop="label"
      >
      </a-tree-select>
      <a-input
        v-else
        :value="data[field.prop]"
        @update:value="onUpdateValue(field, $event)"
        allowClear
      ></a-input>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less"></style>
