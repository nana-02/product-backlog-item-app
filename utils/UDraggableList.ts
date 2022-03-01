import { useWindowDimensions } from 'react-native';
// interface
import { IForm, IOrderableListParam } from '../interface/IDraggableList';

// id生成
export const uuid = require('uuid');

// 色生成
export const getColor = (i: number, length: number) => {
  const multiplier = 255 / (length - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

// Formデータからdraggableリスト用データに生計
export const getOrderableListData = (formData: IForm[]) => {
  const orderableList: IOrderableListParam[] = [...Array(formData.length)].map((d, index) => {
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
  return orderableList;
};

// Formデータからdraggableリスト用データに生計
export const setOrderableListData = (formData: IForm, index: number) => {
  const backgroundColor = getColor(index, index);
    return {
      key: `item-${index}`,
      label: String(index) + '',
      height: 100,
      title: formData.title,
      width: 60 + Math.random() * 40,
      backgroundColor,
    };
};

// window横幅を取得
export const getWindowWidth = useWindowDimensions().width;