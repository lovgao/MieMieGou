// 使用axios二次封装发送网络请求

import req from "./request";
import base from "./base";

// =================== 定义接口约束 ===================
// 约束 获取商品列表的 参数
export interface IPageParams {
  count: number,  // 页码,默认值为1
  limitNum?: number, // 每页显示个数,默认值为10
}
// 约束 用户登录的 参数
export interface ILoginParams {
  loginname: string,
  password: string
}
// 约束 注册的 参数
export interface IRegisterParams {
  tel: string,
  password: string
}
// 约束 加入购物车时需要的 参数
export interface IAddCartParams {
  userid: string,
  proid: string,
  num: number
}
// 约束 更新购物车数量需要的 参数
export interface IUpdateCartNumParams {
  cartid: string,
  num: number
}
// 约束 更新当前购物车数据的选中状态的 参数
export interface ISelectOneGoodsParams {
  cartid: string,
  flag: boolean
}
// 约束 更新所有购物车数据的选中状态的 参数
export interface ISelectAllGoodsParams {
  userid: string,
  type: boolean,
}


// =================== 发送请求 ===================
// 获取首页轮播图
export const getBannerListApi = () => {
  return req.get<any, BannerNS.IBannerItem[]>(base.banner)
}

// 获取商品列表
export const getProListApi = (params: IPageParams) => {
  return req.get<any, GoodsNS.IGoodsItem[]>(base.proList, { params })
}
// 获取商品详情
export const getProDetailApi = (proid: string) => {
  // 返回一个对象 而非数组
  return req.get<any, GoodsNS.IGoodsItem>(`${base.proDetail}/${proid}`)
}

// 登录：账户名/手机号/邮箱 + 密码
export const postLoginApi = (params: ILoginParams) => {
  return req.post<any, { token: string; userid: string }>(base.login, params)
}
// 获取用户信息
export const getUserInfoAPI = (userid: string) => {
  return req.get<any, UserNS.IUserInfo[]>(base.userInfo, {
    params: {
      userid: userid
    }
  })
}
// 注册
export const postRegisterApi = (params: IRegisterParams) => {
  return req.post<any, string>(base.register, params)
}

// 获取购物车列表
export const postCartListApi = (userid: string) => {
  // post请求，传对象
  return req.post<any, CartNS.ICartItem[]>(base.cartList, { userid: userid })
}
// 加入购物车
export const postAddCartApi = (params: IAddCartParams) => {
  return req.post<any, null>(base.addCart, params)
}
// 更新购物车商品数量
export const postUpdateCartNumApi = (params: IUpdateCartNumParams) => {
  return req.post<any, null>(base.updateCartNum, params)
}
//  删除购物车单条数据
export const postDelOneCartGoodsApi = (cartid: string) => {
  return req.post<any, null>(base.delOneCartGoods, { cartid })
}
//  更新当前购物车数据的选中状态
export const postSelectOneGoodsApi = (params: ISelectOneGoodsParams) => {
  return req.post<any, null>(base.selectOneGoods, params)
}

// 更新所有购物车数据的选中状态
export const postSelectAllGoodsApi = (params: ISelectAllGoodsParams) => {
  return req.post<any, null>(base.selectAllGoods, params)
}