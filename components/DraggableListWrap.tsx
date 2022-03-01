import React from 'react';
import { inject, observer } from 'mobx-react';
// component
import { DraggableList } from '../components/DraggableList';
// interface
import { IOrderableListParam, IAppStore } from '../interface/IDraggableList';
// utils
import { getOrderableListData } from '../utils/UDraggableList';


type Iprops = {
  appStore?: IAppStore;
};

type Istate = {
  title?: string;
};

@inject('appStore')
@observer
export default class DraggableListWrap extends React.Component<Iprops, Istate> {
  // storeのformデータを更新するハンドラ
  handleSetFormData = (dataList: IOrderableListParam[]) => {
    dataList && this.props.appStore?.setFormData(dataList);
  };

  render() {
    if (this.props.appStore && this.props.appStore.form) {
      return (
        <DraggableList
          ordableList={getOrderableListData(this.props.appStore.form)}
          setFormData={this.handleSetFormData}
        />
      );
    }
  }
}
