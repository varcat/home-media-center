<script setup>
import Form from "@/components/Form.vue";
import { ref } from "vue";

const refForm = ref();
const formData = ref({});
const fields = [
  {
    prop: "title",
    label: "Video Title",
    required: true,
  },
  {
    prop: "releaseDate",
    label: "Release Date",
  },
];
</script>

<template>
  <div>
    <h3 class="mb-24">Newly Added Video</h3>
    <div class="wrapper">
      <Form
        :label-col="{ span: 6 }"
        :fields="fields"
        v-model:data="formData"
        ref="refForm"
      ></Form>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 500px;
}
</style>
