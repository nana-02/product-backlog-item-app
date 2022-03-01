import React from 'react';
import { inject, observer } from 'mobx-react';
import { IItem, IAppStore } from '../interface/IDraggableList';

import { DraggableList } from '../components/DraggableList';

type Iprops = {
  appStore?: IAppStore;
};

type Istate = {
  title?: string;
};

@inject('appStore')
@observer
export default class DraggableListWrap extends React.Component<Iprops, Istate> {
  getColor = (i: number, length: number) => {
    const multiplier = 255 / (length - 1);
    const colorVal = i * multiplier;
    return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
  }

  getInitialData = (formData: IItem[]) => {
    const initialData: IItem[] = [...Array(formData.length)].map((d, index) => {
      const backgroundColor = this.getColor(index, formData.length);
      return {
        key: `item-${index}`,
        label: String(index) + "",
        height: 100,
        title: formData[index].title,
        width: 60 + Math.random() * 40,
        backgroundColor,
      };
    });
    return initialData;
  }

  handleSetFormData = (dataList: IItem[]) => {
    dataList && this.props.appStore?.setFormData(dataList);
  }

  render() {
    if (this.props.appStore && this.props.appStore.form){
      return (
        <DraggableList items={this.getInitialData(this.props.appStore.form)} setFormData={this.handleSetFormData}/>
        )
      }
  }
}