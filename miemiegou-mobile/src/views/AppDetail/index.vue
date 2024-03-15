<!-- 商品详情页 -->

<template>
  <div class="page app-detail">
    <!-- 头部 -->
    <CommonHeader title="宝贝详情" :back="true" class="app-common-header">
      <!-- 右侧插槽 -->
      <template #right>
        <!-- 声明式导航: 跳转购物车 -->
        <router-link to="/cart" custom v-slot="{ navigate }">
          <van-icon name="cart-o" color="#fff" size="20" @click="navigate" />
        </router-link>
      </template>
    </CommonHeader>

    <template v-if="proDetail">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in proDetail.banners" :key="item">
          <img :src="item" />
        </van-swipe-item>
      </van-swipe>

      <!-- 商品信息展示 -->
      <div class="detail-info">
        <p>{{ proDetail.proname }}</p>
        <p>{{ proDetail.desc }}</p>
      </div>

      <!-- 加入购物车 -->
      <van-submit-bar
        :price="proDetail.originprice * proDetail.discount * 10"
        :button-text="isLogin ? '加入购物车' : '请先登录哦~'"
        label="单价："
        @submit="handleCart"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { getProDetailApi, postAddCartApi } from "@/api/api";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { showNotify } from "vant";

const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);
const route = useRoute();
const router = useRouter();
const proid = route.params.proid;
const proDetail = ref<GoodsNS.IGoodsItem>();

// 加购/登录页
const handleCart = async () => {
  // 未登录 跳往登录页
  if (!isLogin.value) {
    router.push("/login");
  } else {
    // 加入购物车
    try {
      const res = await postAddCartApi({
        userid: userInfo.value.userid,
        proid: route.params.proid as string,
        num: 1,
      });
      // console.log(res);

      if (res === 0 || res === 1) {
        showNotify({ type: "success", message: "添加购物车成功！", duration: 500 });
      } else {
        showNotify({ type: "warning", message: "添加购物车失败！" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

// 获取当前商品详情
const getProDetail = async () => {
  try {
    const res = await getProDetailApi(proid as string);
    proDetail.value = res;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getProDetail();
});
</script>

<style lang="scss" scoped>
.app-detail {
  .my-swipe .van-swipe-item {
    text-align: center;

    img {
      width: 100%;
      height: 4.5rem;
    }
  }

  .detail-info {
    padding: 0.2rem;

    p:first-of-type {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }
  }
}
</style>
