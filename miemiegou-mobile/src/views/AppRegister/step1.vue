<!-- 注册页 -->

<template>
  <div class="page app-register1">
    <CommonHeader
      class="app-common-header"
      title="注 册 - step1：验证手机号"
      :back="true"
    >
    </CommonHeader>

    <!-- 输入手机号 -->
    <van-form @submit="ToNextStep">
      <van-cell-group inset>
        <van-field
          v-model="tel"
          type="tel"
          name="tel"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            {
              required: true,
              message: '请填写手机号',
              validator: validatorTel,
            },
          ]"
          required
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          下一步
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { phoneReg } from "@/utils/common";
import type { FieldRuleValidator } from "vant";

const tel = ref<string>("");
const router = useRouter()

// 表单验证-手机号
const validatorTel: FieldRuleValidator = (tel: string) => {
  if(!tel) return '手机号不能为空';
  if (!phoneReg.test(tel)) return "手机号输入错误";
  console.log(11);

  return true;
};

// 下一步
const ToNextStep = () => {
  // 编程式导航
  router.push({
    name: 'RegisterStep2',
    query: {
      tel: tel.value
    }
  })
};
</script>

<style lang="scss" scoped>
.van-form {
  margin-top: 1.5rem;
}
</style>
