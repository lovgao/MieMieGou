<!-- 购物车 -->
<template>
  <div class="page app-cart">
    <CommonHeader title="购物车" class="app-common-header"> </CommonHeader>

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
            >马上登录</van-button
          >
        </router-link>
      </van-empty>

      <!-- 登录 -->
      <div v-else class="detail">
        <!-- 登录后 购物车不为空时 -->
        <template v-if="cartList">
          <!-- 整个商品卡片 -->
          <van-swipe-cell v-for="item in cartList" :key="item.cartid">
            <!-- 列表信息项 -->
            <div class="cart-item">
              <!-- 复选框 -->
              <van-checkbox
                :model-value="item.flag"
                @update:model-value="handleSelectFlag(item.cartid, !item.flag)"
              />

              <!-- 商品信息 -->
              <van-card
                :num="item.num"
                :price="(item.originprice * (item.discount / 10)).toFixed(2)"
                :title="item.proname"
                :thumb="item.img1"
              >
                <template #tags>
                  <van-tag
                    v-if="item.discount"
                    style="margin-top: 0.1rem"
                    plain
                    type="primary"
                    >{{ item.discount }}折</van-tag
                  >
                </template>
                <template #footer>
                  <van-button
                    @click="handleUpdateNum(item.cartid, item.num + 1)"
                    size="mini"
                    style="font-size: 18px; padding: 0 6px"
                    >+</van-button
                  >
                  <van-button
                    @click="handleUpdateNum(item.cartid, item.num - 1)"
                    :disabled="item.num === 1"
                    size="mini"
                    style="font-size: 18px; padding: 0 8px"
                    >-</van-button
                  >
                </template>
              </van-card>
            </div>

            <!-- 右滑删除 -->
            <template #right>
              <van-button
                @click="handleDelGoods(item.cartid)"
                square
                text="删除"
                type="danger"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>

          <!-- 底部：提交订单栏 -->
          <van-submit-bar
            :price="titlePrice * 100"
            button-text="提交订单"
            @submit="onSubmit"
          >
            <van-checkbox
              :model-value="checkAll"
              @update:model-value="handleCheckAll"
              >全选</van-checkbox
            >
          </van-submit-bar>

          <p class="tip">到底啦，再滑也没有了...</p>
        </template>

        <!-- 登录后 购物车为空时 -->
        <van-empty v-else description="空空如也😯..."></van-empty>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  postCartListApi,
  postUpdateCartNumApi,
  postDelOneCartGoodsApi,
  postSelectOneGoodsApi,
  postSelectAllGoodsApi,
} from "@/api/api";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { showToast, showConfirmDialog } from "vant";
import { computed, onMounted, ref } from "vue";

const userStore = useUserStore();
const { isLogin, userInfo } = storeToRefs(userStore);

const onSubmit = () => showToast("点击按钮");
// 购物车列表
const cartList = ref<CartNS.ICartItem[]>([]);

onMounted(() => {
  // 用户登录的情况下再渲染列表
  if (isLogin.value) {
    postCartList();
  }
});

// 获取购物车列表
const postCartList = async () => {
  try {
    const res = await postCartListApi(userInfo.value.userid);
    cartList.value = res;
  } catch (error) {
    console.log(error);
  }
};

// 更新购物车数量
const handleUpdateNum = async (cartid: string, num: number) => {
  try {
    const res = await postUpdateCartNumApi({ cartid, num });

    // 修改数量后再次更新列表
    postCartList();
  } catch (error) {
    console.log(error);
  }
};

// 删除购物车单条数据
const handleDelGoods = (cartid: string) => {
  showConfirmDialog({
    title: "删除提示",
    message: "真的要离我而去吗？😭",
  })
    .then(async () => {
      // on confirm
      try {
        const res = await postDelOneCartGoodsApi(cartid);
        console.log(res);

        // 修改后再次更新列表
        postCartList();
      } catch (error) {
        console.log(error);
      }
    })
    .catch(() => {
      // on cancel
      console.log("我再看看");
    });
};

// 更新商品选中状态
const handleSelectFlag = async (cartid: string, flag: boolean) => {
  try {
    const res = await postSelectOneGoodsApi({ cartid, flag });
    // console.log(res);

    // 修改后再次更新列表
    postCartList();
  } catch (error) {
    console.log(error);
  }
};

// 反选功能: 依赖于所有商品是否都选中 - 使用计算属性
const checkAll = computed(() => {
  return cartList.value.every((item) => item.flag);
});

// 更新所有购物车数据的选中状态
const handleCheckAll = async () => {
  try {
    await postSelectAllGoodsApi({
      userid: userInfo.value.userid,
      type: !checkAll.value,
    });

    // 修改后再次更新列表
    postCartList();
  } catch (error) {
    console.log(error);
  }
};

// 计算总价
const titlePrice = computed(() => {
  return cartList.value.reduce((prev, item) => {
    // 计算选中的商品总价  prev是前一项，item是当前项
    return item.flag ? prev + item.num * item.originprice * (item.discount / 10) : prev
  }, 0)
}) 
</script>

<style scoped lang="scss">
.app-cart {
  padding-bottom: 2rem;

  .info {
    position: relative;

    // 未登录  购物车空
    .van-empty {
      margin-top: 2.5rem;

      .bottom-button {
        width: 160px;
        height: 40px;
      }
    }

    // 购物车不空
    .cart-item {
      height: 2.8rem;
      display: flex;
      margin: 0.1rem 0;
      overflow: hidden;
      border-radius: 0.2rem;

      // 复选框
      .van-checkbox {
        padding: 0 0.3rem;
        background: var(--van-card-background);
      }

      // 每项
      .van-card {
        flex: 1;
        padding: 0.4rem 0.4rem 0 0;
      }
      .van-card:not(:first-child) {
        margin-top: 0;
      }
    }

    // 右滑删除
    .delete-button {
      height: 2.8rem;
    }

    // 底部
    .van-submit-bar {
      margin-bottom: 50px;
    }

    .tip {
      display: flex;
      justify-content: center;
      margin: 0.3rem 0;
      color: grey;
    }
  }
}
</style>
