import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { TextInput, Button } from 'react-native';
import { IAppStore, IItem } from '../interface/IDraggableList';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

type Iprops = {
  appStore?: IAppStore;
  title?: string;
  dod?: string;
  setTitle: (text: string) => void;
  setDod: (text: string) => void;
  edit: (title: string, dod: string) => IItem[] | void;
  delete: () => IItem[];
  items: IItem[];
  selectDropDownList: (value: string) => void;
};

type Istate = {
  title: string;
  dod: string;
  selectedId: string;
  open: boolean;
  value: string | null;
  items: ItemType[];
};

const getDropDownInfoFromForm = (form: IItem[]): ItemType[] => {
  if (!form) return [];
  const dropDownList: ItemType[] = form.map((item) => {
    return {
      label: item.title ? item.title : '',
      value: item.label,
    };
  });
  return dropDownList;
};

@inject('appStore')
@observer
export default class EditForm extends Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.state = {
      title: '',
      dod: '',
      selectedId: '',
      open: false,
      value: null,
      items: getDropDownInfoFromForm(this.props.items),
    };
  }

  // タイトルハンドル
  handleTitle = (text: string) => {
    this.props.setTitle(text);
    this.setState({
      title: text,
    });
  };

  // DODハンドル
  handleDod = (text: string) => {
    this.props.setDod(text);
    this.setState({
      dod: text,
    });
  };

  // 送信ハンドル
  handleSubmit = () => {
    if (this.state.title === '' || this.state.dod === '') return;
    const newDataList = this.props.edit(this.state.title, this.state.dod);
    this.setState({
      title: '',
      dod: '',
      open: false,
      value: null,
      items: getDropDownInfoFromForm(newDataList!),
    });
  };

  handleDelete = () => {
    const newDataList = this.props.delete();
    this.setState({
      title: '',
      dod: '',
      open: false,
      value: null,
      items: getDropDownInfoFromForm(newDataList!),
    });
  }

  // ドロップダウン 開閉
  setOpen = (open: boolean) => {
    this.setState({
      open,
    });
  };

  // ドロップダウン 値選択
  setValue = (callback: Function) => {
    const found = this.props.items!.find(
      (item) => item.label === callback(value)
    );
    if (!found) return;
    this.setState((state) => ({
      title: found.title!,
      dod: found.dod!,
      selectedId: callback(value),
      value: callback(state.value),
    }));
    this.props.selectDropDownList(callback(value));
  };

  // ドロップダウン 値セット
  setItems = (callback: Function) => {
    this.setState((state) => ({
      items: callback(state.items),
    }));
  };

  render() {
    return (
      <React.Fragment>
        <DropDownPicker
          open={this.state.open}
          value={this.state.value}
          items={getDropDownInfoFromForm(this.props.items)}
          // @ts-ignore
          setOpen={this.setOpen}
          // @ts-ignore
          setValue={this.setValue}
          // @ts-ignore
          setItems={this.setItems}
        />
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Type here the title of item"
          onChangeText={this.handleTitle}
          value={this.state.title}
        />
        <TextInput
          style={{ height: 40, width: 200 }}
          placeholder="Type here the definition of done"
          onChangeText={this.handleDod}
          value={this.state.dod}
        />
        <Button title="Press me" onPress={() => this.handleSubmit()} />
        <Button title="delete me" onPress={() => this.handleDelete()} />
      </React.Fragment>
    );
  }
}
function value(value: any): any {
  throw new Error('Function not implemented.');
}
