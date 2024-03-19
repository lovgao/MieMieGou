// 对axios进行二次封装

import axios from "axios";
import base from './base'
import { showNotify } from 'vant';
// 组件外使用store：现取原则
import { useUserStore } from "@/stores/user";

const req = axios.create({
  baseURL: base.host,
  timeout: 5000
})

// 请求拦截: 在发送请求之前做些什么，例如添加 token
req.interceptors.request.use(
  (config) => {

    // 传递token
    const useStore = useUserStore()
    config.headers.token = useStore.token

    return config
  },
  (err) => {
    return Promise.reject(err)
  })

// 响应拦截: 对响应数据做点什么，例如处理状态码
req.interceptors.response.use(
  (res) => {
    console.log(res);

    const isSuccess = res.data.code === '200'
    // 成功
    if (isSuccess) {
      return res.data.data
    }

    // 单独处理：注册返回信息不在res.data.data中的情况
    const isRegister = isSuccess && res.data.message === '注册成功'
    if (isRegister) {
      return '注册成功'
    }


    // "10019" "token无效"
    const isTokenExpired = res.data.code === '10019'
    // "10010" "该用户不存在"
    const isUserNotExist = res.data.code === '10010'
    // "10011" "密码错误"
    const isPswError = res.data.code === '10011'

    // if (isTokenExpired || isUserNotExist || isPswError) {
    if (!isSuccess) {
      showNotify({ type: 'danger', message: res.data.message });
    }

  },
  (err) => {
    return Promise.reject(err)
  })

export default req