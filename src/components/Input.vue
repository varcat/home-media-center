<script setup>
import { InputType } from "@/utils/const.js";

const props = defineProps({
  type: {
    type: String,
  },
  value: {
    type: [String, Array, Object, Number, Boolean],
  },
  treeData: Array,
  options: Array,
  placeholder: String,
});

const emits = defineEmits(["update:value"]);

function onUpdateValue(evt) {
  emits("update:value", evt);
}
</script>

<template>
  <a-tree-select
    v-if="treeData"
    :value="value"
    @update:value="onUpdateValue"
    :tree-data="treeData"
    show-search
    allow-clear
    tree-node-filter-prop="label"
    :placeholder="placeholder"
  >
  </a-tree-select>
  <a-select
    v-else-if="options"
    :value="value"
    @update:value="onUpdateValue"
    :options="options"
    mode="multiple"
  >
  </a-select>
  <a-textarea
    v-else-if="type === InputType.text"
    :value="value"
    @update:value="onUpdateValue"
    allowClear
    showCount
    :autoSize="{ minRows: 5, maxRows: 11 }"
    :placeholder="placeholder"
  ></a-textarea>
  <a-input
    v-else
    :value="value"
    @update:value="onUpdateValue"
    allowClear
    :placeholder="placeholder"
  ></a-input>
</template>

<style scoped lang="less"></style>
