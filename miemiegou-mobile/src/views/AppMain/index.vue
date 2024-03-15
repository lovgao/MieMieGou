<!-- 首页 -->

<template>
  <div class="page app-main">
    <!-- 头部 -->
    <CommonHeader class="app-common-header">
      <!-- 中间插槽 -->
      <template #title>
        <van-search
          shape="round"
          background="#e35b43"
          placeholder="请输入搜索关键词"
        />
      </template>

      <!-- 右侧插槽 -->
      <template #right>
        <span v-if="userStore.isLogin">{{ userStore.userInfo.nickname }}</span>
        <!-- 声明式导航 -->
        <router-link v-else to="/login" custom v-slot="{ navigate }">
          <span @click="navigate">去登录</span>
        </router-link>
      </template>
    </CommonHeader>

    <!-- 轮播图 -->
    <MainBanner></MainBanner>

    <!-- 内容区域 -->

    <!-- 十宫格 -->
    <MainNav></MainNav>

    <!-- 商品列表 -->
    <CommonList :column="2" :action="getProListApi"></CommonList>
  </div>
</template>

<script setup lang="ts">
import { getProListApi } from "@/api/api";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore()
</script>

<style scoped lang="sass"></style>
