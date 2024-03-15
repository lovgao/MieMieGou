<!-- 注册页 -->

<template>
  <div class="page app-register">
    <CommonHeader
      class="app-common-header"
      title="注 册 - step3：设置密码"
      :back="true"
    >
    </CommonHeader>

    <!-- 登录信息表单 -->
    <van-form @submit="onRegister">
      <van-cell-group inset>
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密 码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '密码不能为空' }]"
          required
        />
        <van-field
          v-model="confirmPwd"
          type="password"
          name="confirmPwd"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[
            {
              required: true,
              message: '确认密码不能为空',
              validator: validatorPwd,
            },
          ]"
          required
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { FieldRuleValidator } from "vant";
import { showNotify } from "vant";
import { postRegisterApi } from "@/api/api";

const router = useRouter();
const route = useRoute();

// 注册信息
const password = ref<string>("");
const confirmPwd = ref<string>("");

// 二次确认密码
const validatorPwd: FieldRuleValidator = (rePwd: string) => {
  if (!rePwd) return "确认密码不能为空!";
  if (password.value !== rePwd) return "两次密码不一致，请重试！";

  return true;
};

// 注册
const onRegister = async () => {
  try {
    // 发送注册请求
    const res = await postRegisterApi({
      tel: route.query.tel as string,
      password: confirmPwd.value,
    });
    console.log(res);
    

    // 友好提示
    // if (res === "注册成功") {
      showNotify({ type: "success", message: "注册成功！为您跳转至登录页", duration: 500 });

      // 页面跳转
      router.push("/login");
    // }
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
