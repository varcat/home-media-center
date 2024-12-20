<script setup>
import { computed, ref, unref } from "vue";
import Input from "@/components/Input.vue";

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

const rules = computed(() => {
  return props.fields.reduce((acc, field) => {
    if (!Array.isArray(acc[field.prop])) {
      acc[field.prop] = [];
    }
    if (Array.isArray(field.rules)) {
      acc[field.prop].push(...field.rules);
    }
    if (field.required) {
      acc[field.prop].push({
        required: true,
        message: `Please input ${field.label}`,
        trigger: "blur",
      });
    }
    return acc;
  }, {});
});

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
  try {
    const data = await unref(refForm).validate(nameList);
    return [null, data];
  } catch (e) {
    return [e, null];
  }
}

defineExpose({
  resetFields,
  validate,
});
</script>

<template>
  <a-form
    :model="data"
    :label-col="labelCol"
    :ref="(r) => (refForm = r)"
    :rules="rules"
  >
    <a-form-item
      v-for="field of fields"
      :key="field.prop"
      :label="field.label"
      :name="field.prop"
    >
      <Input
        :type="field.type"
        :value="data[field.prop]"
        @update:value="onUpdateValue(field, $event)"
        v-bind="field.iptProps"
        :tree-data="field.treeData"
        :options="field.options"
        :disabled="field.disabled"
      >
      </Input>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less"></style>
