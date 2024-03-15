<template>
  <van-nav-bar :title="title" :left-arrow="back" @click-left="handleBack" fixed>
    <template #left v-if="!back">
      <slot name="left"></slot>
    </template>
    <template #title v-if="!title">
      <slot name="title"></slot>
    </template>
    <template #right>
      <slot name="right"></slot>
    </template>
  </van-nav-bar>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

// 定义接口
interface IHeaderProps {
  title?: string;
  back?: boolean;
}

const { title, back = false } = defineProps<IHeaderProps>();
const router = useRouter();

// 返回上一页
const handleBack = () => {
  if (back) {
    router.back();
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  z-index: 999;
}
</style>
