import React from 'react';
import { inject, observer } from 'mobx-react';
import { IForm, IItem } from '../interface/IDraggableList';

import { DraggableList } from '../components/DraggableList';

type Iprops = {
  appStore?: {
    form?: IForm[];
    setFormData: (newForm: IForm[]) => {};
  };
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

  getInitialData = (formData: IForm[]) => {
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

  handleInject = (dataList: IForm[]) => {
    dataList && this.props.appStore?.setFormData(dataList);
  }
  render() {
    if (this.props.appStore && this.props.appStore.form){
      return (
        <DraggableList listData={this.getInitialData(this.props.appStore.form)} handleInject={this.handleInject}/>
        )
      }
  }
}