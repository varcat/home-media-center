<script setup>
import Table from "@/components/Table.vue";
import { deleteVideo, getVideoList } from "@/service/video.js";
import { onMounted, ref } from "vue";
import Pagination from "@/components/Pagination.vue";
import { useRouter } from "vue-router";

const total = ref(0);
const page = ref(1);
const videoList = ref([]);
const loading = ref(false);

const router = useRouter();

async function loadList() {
  loading.value = true;
  const { ok, data } = await getVideoList();
  loading.value = false;
  if (!ok) return;
  videoList.value = data.rows;
  total.value = data.total;
}

async function onDelete(row) {
  await deleteVideo({
    id: row.id,
  });
  loadList();
}

function toEditPage() {
  router.push({
    path: "/admin/video/edit",
  });
}

onMounted(() => {
  loadList();
});
</script>

<template>
  <div class="text-right mb-16">
    <a-button type="primary" @click="toEditPage()">Add Video</a-button>
  </div>

  <a-list
    :data-source="videoList"
    item-layout="horizontal"
    size="small"
    :loading="loading"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          <template #avatar>
            <a-image :height="80" :src="item.coverImg"></a-image>
          </template>
          <template #title>
            <div style="font-weight: bold">
              {{ item.title }}
              <span style="color: #888">({{ item.releaseDate }})</span>
            </div>
          </template>
          <template #description>
            <a-typography-paragraph
              style="color: #444"
              :ellipsis="{ rows: 2, expandable: true, symbol: 'more' }"
              :content="item.content || '暂无简介'"
            />
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button type="link" @click="toEditPage(item)">Edit</a-button>
          <a-popconfirm
            title="Are you sure delete this video?"
            @confirm="onDelete(item)"
          >
            <a-button danger type="link">Delete</a-button>
          </a-popconfirm>
        </template>
      </a-list-item>
    </template>
  </a-list>

  <Pagination v-model:current="page" :total="total" />
</template>

<style scoped lang="less"></style>
