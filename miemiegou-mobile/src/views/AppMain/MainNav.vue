<!-- 首页-十宫格 -->

<template>
  <div class="page app-main-nav">
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="nav in navList"
        :key="nav.navId"
        :icon="nav.url"
        :text="nav.text"
        @click="handleToList(nav.text)"
      />
    </van-grid>
  </div>
</template>

<script setup lang="ts">
import navList from "@/utils/navList";
import { useRouter } from "vue-router";

const router = useRouter();

// nav 点击跳转到列表页 `/list?search=锋购超市`
const handleToList = (title: string) => {
  router.push({
    name: "List",
    query: { search: title },
  });
};
</script>

<style lang="scss" scoped>
.app-main-nav {
  width: 97%;
  margin: 0px auto;
  border: 1px solid #fdf8f8;
  border-radius: 10px;
  overflow: hidden;
}
</style>
