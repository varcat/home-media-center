<script setup>
import { LIST_PAGE_SIZE } from "@/utils/const.js";

const props = defineProps({
  current: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
  },
});

const pageSize = LIST_PAGE_SIZE;

const emits = defineEmits(["update:current", "change"]);

function handleChange(page) {
  emits("update:current", page);
  emits("change", {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });
}
</script>

<template>
  <div class="flex justify-end pt-16" v-if="total > 0">
    <a-pagination
      :current="current"
      :page-size="pageSize"
      size="small"
      :total="total"
      :show-total="(x) => `Total ${x} items`"
      @change="handleChange"
    />
  </div>
</template>

<style scoped lang="less"></style>
