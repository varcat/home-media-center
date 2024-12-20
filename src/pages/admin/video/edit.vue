<script setup>
import Form from "@/components/Form.vue";
import { computed, onMounted, ref, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTags } from "@/service/tags.js";
import { InputType } from "@/utils/const.js";
import {
  apiAddVideo,
  apiUpdateVideo,
  apiGetVideoEditData,
} from "@/service/video.js";
import { isExist } from "wsp-toolkit";

const route = useRoute();
const router = useRouter();
const editVideoId = computed(() => route.query.id);
const tags = ref([]);
const saveLoading = ref(false);

const refForm = ref();
const formData = ref({
  coverImgName: "cover.webp",
});
const fields = computed(() => {
  return [
    {
      prop: "title",
      label: "Video Title",
      required: true,
    },
    {
      prop: "releaseDate",
      label: "Release Date",
      required: true,
      iptProps: {
        placeholder: "2024",
      },
    },
    {
      prop: "coverImgName",
      label: "Poster File Name",
      required: true,
      iptProps: {
        placeholder: "xxx.jpg",
      },
    },
    {
      prop: "dirPath",
      label: "Video Directory",
      required: true,
      disabled: isExist(unref(editVideoId)),
      iptProps: {
        placeholder: "/a/b/c",
      },
    },
    {
      prop: "tags",
      label: "Types",
      options: unref(tags),
    },
    {
      prop: "content",
      label: "Introduction",
      type: InputType.text,
    },
  ];
});

async function onSave() {
  const [err, data] = await unref(refForm).validate();
  if (err) {
    return;
  }
  const api = isExist(unref(editVideoId)) ? apiUpdateVideo : apiAddVideo;
  saveLoading.value = true;
  const { ok } = await api(data);
  saveLoading.value = false;
  if (!ok) return;
  router.back();
}

onMounted(() => {
  if (unref(editVideoId)) {
    apiGetVideoEditData(unref(editVideoId)).then(({ ok, data }) => {
      if (!ok) {
        return;
      }

      formData.value = {
        title: data.title,
        releaseDate: data.releaseDate,
        coverImgName: data.coverImg,
        dirPath: data.path,
        tags: data.tags?.map((x) => x.id),
        content: data.content,
      };
    });
  }

  getTags().then((res) => {
    if (!res.ok) return;
    tags.value = res.data.map((x) => {
      return {
        value: x.id,
        label: x.name,
      };
    });
  });
});
</script>

<template>
  <div>
    <h1>{{ editVideoId ? "Edit" : "Add" }} Video</h1>
    <div class="wrapper">
      <Form
        :label-col="{ span: 6 }"
        :fields="fields"
        v-model:data="formData"
        ref="refForm"
      ></Form>

      <a-space class="flex justify-end">
        <a-button @click="router.back()">Cancel</a-button>
        <a-button type="primary" @click="onSave" :loading="saveLoading"
          >Save</a-button
        >
      </a-space>
    </div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  width: 800px;
}
</style>
