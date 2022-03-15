import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { IAppStore, IItem } from '../interface/IDraggableList';
const { v4: uuidv4 } = require('uuid');
import Form from './Form';
import EditForm from './EditForm';

type Iprops = {
  appStore?: IAppStore;
  isEdit?: boolean;
};

type Istate = {
  title?: string;
  dod?: string;
  uniqueId?: string;
};

@inject('appStore')
@observer
export default class TogglableForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: '',
      dod: '',
    };
  }

  handleTitle = (text: string) => {
    this.setState({
      title: text,
    });
  };

  handleDod = (text: string) => {
    this.setState({
      dod: text,
    });
  };

  handleSubmit = (title: string, dod: string): IItem[] | void => {
    const form = this.props.appStore!.form;
    if (!form) return;
    const dataList = form.slice();
    // 新規登録
    if (!this.props.isEdit) {
      const index = String(form.length + 1);
      const keyword = `item-${index}`;
      dataList?.push({
        id: uuidv4(),
        key: keyword,
        title: title,
        dod: dod,
        label: index,
        height: 0,
        width: 0,
        backgroundColor: '',
      });
      dataList && this.props.appStore?.setFormData(dataList);
      this.setState({
        title: '',
        dod: '',
      });
      // 編集
    } else {
      const newDataList = dataList.map((data) => {
        if (data.id === this.state.uniqueId) {
          return Object.assign({}, data, {
            title: this.state.title,
            dod: this.state.dod,
          });
        } else {
          return data;
        }
      });
      newDataList && this.props.appStore?.setFormData(newDataList);
      this.setState({
        title: '',
        dod: '',
        uniqueId: '',
      });
      return newDataList;
    }
  };

  handleDelete = (): IItem[] => {
    const newDataList = this.props.appStore!.form!.filter(
      (data) => data.id !== this.state.uniqueId
    );
    newDataList && this.props.appStore?.setFormData(newDataList);
    this.setState({
      title: '',
      dod: '',
      uniqueId: '',
    });
    return newDataList;
  };

  handleSelectDropDownList = (value: string) => {
    const array = this.props.appStore?.form?.slice();
    const found = array!.find((element) => element.label === value);
    if (!found) return;
    this.setState({
      title: found.title,
      dod: found.dod,
      uniqueId: found.id,
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.props.isEdit && (
          <Form
            title={this.state.title}
            dod={this.state.dod}
            setTitle={this.handleTitle}
            setDod={this.handleDod}
            submit={this.handleSubmit}
          />
        )}
        {this.props.isEdit && (
          <EditForm
            title={this.state.title}
            dod={this.state.dod}
            setTitle={this.handleTitle}
            setDod={this.handleDod}
            edit={this.handleSubmit}
            delete={this.handleDelete}
            selectDropDownList={this.handleSelectDropDownList}
            items={this.props.appStore?.form!}
          />
        )}
      </React.Fragment>
    );
  }
}
