// 主题色配置: 在 TypeScript 中定义 themeVars 时，建议使用 Vant 提供的 ConfigProviderThemeVars 类型，可以提供完善的类型提示

import type { ConfigProviderThemeVars } from "vant";

export const themeVars: ConfigProviderThemeVars = {
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackground: '#07c160',
  buttonPrimaryBackground: "#e35b43", // button 背景颜色
  buttonPrimaryBorderColor: "#ccc", // button 边框颜色
  dropdownMenuTitleActiveTextColor: "#e35b43", // 下拉菜单选中颜色
  dropdownMenuOptionActiveColor: "#e35b43",
  tabbarItemActiveColor: '#e35b43',
}