import React from 'react';
import { inject, observer } from 'mobx-react';
import { IForm } from '../interface/IForm';

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
  render() {
    console.log('hoge');
    if (this.props.appStore && this.props.appStore.form){
      return (
        <DraggableList formData={this.props.appStore.form} />
        )
      }
  }
}