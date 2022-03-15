import { useWindowDimensions } from 'react-native';

// 色生成
export const getColor = (i: number, length: number) => {
  const multiplier = 255 / (length - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

// window横幅を取得
export const getWindowWidth = useWindowDimensions().width;