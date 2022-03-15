import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TextInput, Button } from 'react-native';

type Iprops = {
  title?: string;
  dod?: string;
  setTitle: (text: string) => void;
  setDod: (text: string) => void;
  submit: (title: string, dod: string) => void;
};

type Istate = {
  title: string;
  dod: string;
};

@inject('appStore')
@observer
export default class Form extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: '',
      dod: '',
    };
  }

  handleTitle = (text: string) => {
    this.props.setTitle(text);
    this.setState({
      title: text
    });
  };
  handleDod = (text: string) => {
    this.props.setDod(text);
    this.setState({
      dod: text
    });
  };

  handleSubmit = () => {
    if (this.state.title === '' || this.state.dod === '') return;
    this.props.submit(this.state.title, this.state.dod);
    this.setState({
      title: '',
      dod: '',
    });
  };

  render() {
    return (
      <React.Fragment>
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Type here the title of item"
          onChangeText={this.handleTitle}
          value={this.props.title}
        />
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Type here the definition of done"
          onChangeText={this.handleDod}
          value={this.props.dod}
        />
        <Button title="Press me" onPress={() => this.handleSubmit()} />
      </React.Fragment>
    );
  }
}
