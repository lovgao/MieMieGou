// 约束轮播图数据

// 根据后端给的接口文档，定义声明文件：通常，将一些全局的类型声明放置到项目根目录@type中，需要利用 declare namespace来简化使用方式。

// 命名空间
declare namespace BannerNS {
  interface IBannerItem {
    alt: string,
    bannerid: string,
    flag: boolean,
    img: string,
    link: string
  }
}