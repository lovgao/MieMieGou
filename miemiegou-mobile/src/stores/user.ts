// 用户信息相关

import { postLoginApi, type ILoginParams, getUserInfoAPI } from "@/api/api";
import router from "@/router";
import { defineStore } from "pinia";
import { computed, ref } from 'vue';
import { showNotify } from 'vant';


export const useUserStore = defineStore('user', () => {

  // state
  const token = ref<string>('')
  const userInfo = ref<UserNS.IUserInfo>({
    userid: '',
    username: '',
    nickname: '',
  })

  // getters 计算属性 判断用户是否登录成功
  const isLogin = computed(() => {
    return !!userInfo.value.userid
  })

  // actions 登录方法
  const loginAction = async (params: ILoginParams) => {
    // 调用登录接口，返回token；再调用获取个人信息接口
    try {
      const res = await postLoginApi(params)
      console.log(res);

      // 【优化】不存在的用户取不到res
      if (res) {
        // 存仓库
        const { userid } = res
        token.value = res.token

        // 借助userid：获取用户信息
        const info = await getUserInfoAPI(userid)
        console.log(info);

        // 用户信息存仓库
        userInfo.value = info[0]

        // 成功提醒
        showNotify({ type: 'success', message: '恭喜，登录成功!' });

        // 回首页
        router.push('/')
      }

    } catch (error) {
      console.log(error);
    }
  }

  // actions 退出登录
  const exitAciton = async () => {
    // 清空仓库
    token.value = ''
    userInfo.value = {
      userid: '',
      username: '',
      nickname: '',
    }

    // 回首页
    router.push('/')
  }

  return {
    token,
    userInfo,
    isLogin,
    loginAction,
    exitAciton
  }
},
  {
    // 配置项：持久化 pinia-plugin-persistedstate 插件
    persist: true,
  })