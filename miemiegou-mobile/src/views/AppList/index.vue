<!-- 商品列表页 -->

<template>
  <div class="page app-main-list">
    <!-- 头部 -->
    <CommonHeader class="app-common-header" :back="true">
      <!-- 中间插槽 -->
      <template #title>
        <van-search shape="round" background="#e35b43" :placeholder="keyword" />
      </template>
    </CommonHeader>
    
    <CommonList :column="1" :action="getProListApi"></CommonList>
  </div>
</template>

<script setup lang="ts">
import CommonList from '@/components/CommonList.vue';
import { ref } from 'vue'
import { useRoute } from "vue-router";
import { getProListApi } from "@/api/api";

const route = useRoute();
// as string 断言 一定是字符串
const keyword = ref<string>(route.query.search as string || '');
</script>

<style lang="scss" scoped></style>
