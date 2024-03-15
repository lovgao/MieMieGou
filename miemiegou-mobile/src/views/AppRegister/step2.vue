<!-- 注册页 -->

<template>
  <div class="page app-register2">
    <CommonHeader
      class="app-common-header"
      title="注 册 - step2：输入验证码"
      :back="true"
    >
    </CommonHeader>

    <!-- 获取验证码 -->
    <van-form @submit="onNextStep">
      <van-cell-group inset>
        <van-field
          v-model="sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入验证码"
          :rules="[
            {
              required: true,
              message: '请填写验证码',
            },
          ]"
          required
        >
          <template #button>
            <van-button
              @click="handleSendCode"
              :disabled="!!second"
              size="small"
              type="primary"
              >发送验证码 {{ second ? `(${second}s)` : "" }}</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button :disabled="!canNext" round block type="primary" native-type="submit">
          下一步
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute()

// 验证码
const sms = ref<string>("");
// 倒计时
const second = ref<number>(10);
let timer: null | number = null;

// 进入页面就先发一次验证码
onMounted(() => {
  handleSendCode();
});



// 发送验证码
const handleSendCode = () => {
  console.log("发送验证码");

  // 每次开启定时器时，均设置为10
  second.value = 10

  timer = setInterval(() => {
    // 每秒减1
    second.value--;

    if (second.value === 0) {
      // 清除定时器
      clearInterval(timer as number);
    }
  }, 1000);
};

// 能否点击“下一步”
const canNext = computed(() => {
  if(!sms.value) return false
  return true
})

// 下一步
const onNextStep = () => {
  
  // 编程式导航
  router.push({
    name: "RegisterStep3",
    query: {
      tel: route.query.tel,
    },
  });
};

// 组件卸载
onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.van-form {
  margin-top: 1.5rem;
}
</style>
