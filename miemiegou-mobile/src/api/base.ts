// 统一管理所有接口

const base = {
  host: 'http://121.89.205.189:3000/api',  // 域名

  // api
  banner: '/banner/list',  // 轮播图
  proList: '/pro/list',  // 商品列表
  proDetail: '/pro/detail',  // 商品详情
  login: '/user/login', // 登录
  userInfo: '/user/info', // 用户信息
  register: '/user/dofinishregister', // 注册
  cartList: '/cart/list', // 查看购物车列表
  addCart: '/cart/add', // 加入购物车
  updateCartNum: '/cart/updatenum', // 更新购物车数量
  delOneCartGoods: '/cart/remove', //  删除购物车单条数据
  selectOneGoods: '/cart/selectone', //  更新当前购物车数据的选中状态
  selectAllGoods: '/cart/selectall', // 更新所有购物车数据的选中状态
}

export default base