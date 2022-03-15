import React from 'react';
import { inject, observer } from 'mobx-react';

import { DraggableList } from '../components/DraggableList';
// interface
import { IItem, IAppStore } from '../interface/IDraggableList';

type Iprops = {
  appStore?: IAppStore;
};

type Istate = {
  title?: string;
};

@inject('appStore')
@observer
export default class DraggableListWrap extends React.Component<Iprops, Istate> {
  handleSetFormData = (dataList: IItem[]) => {
    dataList && this.props.appStore?.setFormData(dataList);
  };

  render() {
    if (this.props.appStore && this.props.appStore.form) {
      return (
        <DraggableList
          items={this.props.appStore.form}
          setFormData={this.handleSetFormData}
        />
      );
    }
  }
}
