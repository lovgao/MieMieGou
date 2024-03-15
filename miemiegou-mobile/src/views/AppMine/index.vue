<!-- 个人中心 -->
<template>
  <div class="page app-mine">
    <CommonHeader title="个人中心" class="app-common-header"> </CommonHeader>

    <div class="info">
      <!-- 未登录 -->
      <van-empty v-if="!isLogin" description="糟糕...还没有登录😯...">
        <!-- 声明式导航 -->
        <router-link to="/login" custom v-slot="{ navigate }">
          <van-button
            @click="navigate"
            round
            type="primary"
            class="bottom-button"
            >请先登录</van-button
          >
        </router-link>
      </van-empty>

      <!-- 登录 -->
      <div class="userInfo" v-else>
        <van-image round width="3rem" height="3rem" :src="userInfo.avatar" />
        <h3>
          尊贵的
          <span>{{ userInfo.nickname }}</span>
          老板
        </h3>

        <!-- 退出登录 -->
        <van-button @click="exitLogin" round type="primary" class="bottom-button">退 出 登 录</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

// 想解构userStore中的数据，不能直接使用ES6语法，会变成非响应式数据，应该使用 storeToRefs
const { isLogin, userInfo } = storeToRefs(userStore);
// 【疑惑】为什么这里使用userInfo不需要 .value 使用，在AppCart/index中需要
// 【已解决】在js中使用时需要添加 .value ,在template模板中不需要 .value（为什么？）

// 退出登录
const exitLogin = () => {
  userStore.exitAciton()
}
</script>

<style scoped lang="scss">
.info {
  position: relative;

  .van-empty {
    margin-top: 2.5rem;

    .bottom-button {
      width: 160px;
      height: 40px;
    }
  }

  // 登录后-信息页
  .userInfo {
    position: absolute;
    top: 2rem;
    left: 2.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h3 {
      margin-top: 0.3rem;
      font-size: 20px;

      span {
        color: goldenrod;
      }
    }

    .van-button {
      margin-top: 3.5rem;
      padding: 0 1rem;
    }
  }
}
</style>
