<!-- 首页-轮播图 -->
<template>
  <div class="page app-main-banner">
    <div class="swiper-container">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.bannerid">
          <img :src="item.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getBannerListApi } from "@/api/api";

onMounted(() => {
  getBannerList();
});

// 存放轮播图列表  【优化】约束返回类型
const bannerList = ref<BannerNS.IBannerItem[]>([]);

// 获取轮播图
const getBannerList = async () => {
  // 使用try...catch
  try {
    const res = await getBannerListApi();

    // 【优化】对res也要进行约束，即对 getBannerListApi()接口的返回值约束
    bannerList.value = res;
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/var.scss";

.app-main-banner {
  height: 3.4rem;
  position: relative;
  overflow: hidden;
  z-index: 1;

  // 伪元素追加：实现圆背景
  &::after {
    content: "";
    display: block;
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    background-color: $theme-color;
    position: absolute;
    top: -18rem;
    left: -6.5rem;
    z-index: -1;
  }

  .swiper-container {
    border-radius: 10px;
    width: 95%;
    height: 3rem;
    margin-top: 2rem;
    margin: 10px auto;
    border-radius: 10px;
    // 【问题】子元素的背景内容溢出了，导致圆角没有生效。所以在父元素上添加overflow使其子元素溢出隐藏【解决】
    overflow: hidden;

    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 2.8rem;
      text-align: center;

      img {
        width: 100%;
        height: auto;
        position: relative;
        top: -0.5rem;
      }
    }
  }
}
</style>
