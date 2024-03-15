// 约束商品

declare namespace GoodsNS {
  // 商品对象
  interface IGoodsItem {
    readonly proid: string;
    proname: string;
    originprice: number;  // 原价
    category: string;  // 分类
    brand: string; // 标签
    desc: string;  // 描述
    img1: string;  // 封面
    discount: number;  // 打折
    banners: string[]; // 轮播图属性
  }
}