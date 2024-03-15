<script setup lang="ts">
import { themeVars } from "@/config/theme";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute();
// console.log(route);
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <!-- 路由出口 -->
    <main class="app-container">
      <router-view></router-view>
    </main>

    <!-- 底部 -->
    <CommonFooter v-if="!route.meta.hideFooter"/>
  </van-config-provider>
</template>

<style scoped>
.app-container {
  margin-top: 45px;
}
</style>
