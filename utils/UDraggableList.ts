import { useWindowDimensions } from 'react-native';
// interface
import { IForm, IItem } from '../interface/IDraggableList';

// id生成
export const uuid = require('uuid');

// 色生成
export const getColor = (i: number, length: number) => {
  const multiplier = 255 / (length - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

// Forデータからdraggableリスト用データに生計
export const getOrderableListData = (formData: IForm[]) => {
  const initialData: IItem[] = [...Array(formData.length)].map((d, index) => {
    const backgroundColor = getColor(index, formData.length);
    return {
      key: `item-${index}`,
      label: String(index) + '',
      height: 100,
      title: formData[index].title,
      width: 60 + Math.random() * 40,
      backgroundColor,
    };
  });
  return initialData;
};

// window横幅を取得
export const getWindowWidth = useWindowDimensions().width;