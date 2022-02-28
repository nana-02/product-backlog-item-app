import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TextInput, Button, Text } from 'react-native';
import { IForm } from '../interface/IDraggableList';

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
export default class AppContainer extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);

    this.state = {
      title: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTitle = (text: string) => {
    this.setState({
      title: text,
    });
  };

  handleSubmit = () => {
    const dataList = this.props.appStore!.form?.slice();
    dataList?.push({id: 1, title: this.state.title});
    dataList && this.props.appStore?.setFormData(dataList);
    this.setState({
      title: ''
    })
  }

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
        <Button
          title="Press me"
          onPress={() => this.handleSubmit()}
        />
      </React.Fragment>
    );
  }
}
