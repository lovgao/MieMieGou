<!-- 登录页 -->

<template>
  <div class="page app-login">
    <CommonHeader class="app-common-header" title="登 录" :back="true">
      <!-- 右侧插槽 -->
      <template #right>
        <!-- 声明式导航 -->
        <router-link to="/register-step1" custom v-slot="{ navigate }">
          <span @click="navigate">去注册</span>
        </router-link>
      </template>
    </CommonHeader>

    <!-- 登录信息表单 -->
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="loginInfo.loginname"
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
        <van-field
          v-model="loginInfo.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          required
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import CommonHeader from "@/components/CommonHeader.vue";
import { ref } from "vue";
import { phoneReg } from "@/utils/common";
// import { postLoginApi } from "@/api/api";
import { useUserStore } from "@/stores/user";
import type { FieldRuleValidator } from 'vant';

const userStore = useUserStore();

// 定义接口进行约束
interface ILoginInfo {
  loginname: string;
  password: string;
}

// 表单验证-手机号
// 【问题】validator会报不能把validatorTel中的string类型分配给validator中的FieldRuleValidator类型，这是vant库里规定的，所以要引入该类型并约束validatorTel；且返回值也有要求，因为这里一定返回的是字符串，但ts检查不信任，所以直接返回一个true
const validatorTel: FieldRuleValidator = (tel: string) => {
  if(!tel) return '手机号不能为空';
  if (!phoneReg.test(tel)) return "手机号输入错误";

  return true
};

// 登录信息
const loginInfo = ref<ILoginInfo>({
  loginname: "",
  password: "",
});

// 登录
const onSubmit = async (values: any) => {
  console.log("submit", values);
  try {
    // 15011111111   11111111
    // const res = await postLoginApi(loginInfo.value);

    // 将登录信息存到pinia，从仓库 loginAction
    userStore.loginAction(loginInfo.value);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.van-form {
  margin-top: 1.5rem;
}
</style>
