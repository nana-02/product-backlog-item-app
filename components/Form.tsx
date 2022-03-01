import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TextInput, Button, Text } from 'react-native';
import { IAppStore } from '../interface/IDraggableList';

type Iprops = {
  appStore?: IAppStore;
};

type Istate = {
  title?: string;
};

@inject('appStore')
@observer
export default class AppContainer extends Component<Iprops, Istate> {
  state = {
    title: '',
  };

  handleTitle = (text: string) => {
    this.setState({
      title: text,
    });
  };

  handleSubmit = () => {
    const form = this.props.appStore!.form;
    if (!form) return;
    const dataList = form.slice();
    const index = String(form.length + 1);
    const keyword = `item-${index}`;
    dataList?.push({
      key: keyword,
      title: this.state.title,
      label: index,
      height: 0,
      width: 0,
      backgroundColor: '',
    });
    dataList && this.props.appStore?.setFormData(dataList);
    this.setState({
      title: '',
    });
  };

  render() {
    return (
      <React.Fragment>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Type here the title of item"
          onChangeText={this.handleTitle}
          value={this.state.title}
        />
        <Text>{this.state.title}</Text>
        <Button title="Press me" onPress={() => this.handleSubmit()} />
      </React.Fragment>
    );
  }
}
