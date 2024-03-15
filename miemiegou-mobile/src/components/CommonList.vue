<template>
  <!-- 动态添加类属性，是2列需求时，则动态添加类名 half -->
  <div class="common-list" :class="{ half: column === 2 }">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 循环渲染商品列表项 -->
      <div class="list-container">
        <div
          class="list-item"
          v-for="item in goodsList"
          :key="item.proid"
          @click="handleToDetail(item.proid)"
        >
          <img :src="item.img1" />
          <div class="info">
            <div class="name van-multi-ellipsis--l2">{{ item.proname }}</div>
            <div class="price">
              <span
                >￥{{
                  (item.originprice * (item.discount / 10) ).toFixed(2)
                }}</span
              >
              <span
                >￥{{ item.originprice }}
                <van-tag plain type="primary">{{ item.discount }}折</van-tag>
              </span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { type IPageParams } from "@/api/api";
import { useRouter } from "vue-router";

// 商品列表
const goodsList = ref<GoodsNS.IGoodsItem[]>([]);
const loading = ref<boolean>(false);
const finished = ref<boolean>(false);
// 定义页码信息
const pageInfo = reactive<IPageParams>({
  count: 1,
  limitNum: 10,
});
const router = useRouter();

// 定义接口约束
type column = 1 | 2;
interface IProps {
  column?: column;
  action(params: IPageParams): any; // 传递的是发送网络请求的方法
}

// 接收父组件传值
const { column = 2, action } = defineProps<IProps>();

// 去商品详情页
const handleToDetail = (proid: any) => {
  router.push({
    // 命名路由传参
    name: "Detail",
    params: {proid}
  });
};

// 异步更新数据
const onLoad = async () => {
  try {
    // 根据 pageparams.d.ts 约束传递参数
    const res = await action(pageInfo);
    // 拼接数据
    goodsList.value = goodsList.value.concat(res);

    // 加载结束
    loading.value = false;

    // 数据全部加载完毕
    if (res.length === 0) {
      finished.value = true;
    }

    // 页码加1
    pageInfo.count++;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  onLoad();
});
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.common-list {
  width: 97%;
  margin: 2px auto;
  padding-bottom: 50px;
  border-radius: 10px;

  // 2列 列表样式
  &.half .list-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    // 列表项
    .list-item {
      width: 3.4rem;
      flex-direction: column;

      img {
        width: 3.4rem;
        height: 3.4rem;
      }

      .info {
        .name {
          margin: 0.1rem 0.1rem 0.3rem 0;
        }

        .price {
          margin-bottom: 0.1rem;
        }
      }
    }
  }

  // 1列 列表样式
  .list-container {
    // 列表项
    .list-item {
      background: #fff;
      display: flex;
      margin: 0.1rem 0;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 10px;
      }

      .info {
        margin-left: 0.1rem;

        .name {
          font-size: 16px;
          margin: 0.1rem 0.1rem 0.5rem 0;
        }

        .price {
          // 表示一组兄弟元素中其类型的第一个元素
          span:first-of-type {
            font-size: 14px;
            font-weight: bold;
            color: $theme-color;
            margin-right: 0.2rem;
          }

          span:last-of-type {
            font-size: 12px;
            color: gray;

            .van-tag {
              color: $theme-color;
            }
          }
        }
      }
    }
  }
}
</style>
