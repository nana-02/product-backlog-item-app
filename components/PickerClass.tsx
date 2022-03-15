import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

type IProps = {
  dropDownList: ItemType[];
  selectDropDownList: (value: string) => void;
  pickerItems: (items: ItemType[]) => void;
}

type IState = {
  open: boolean;
  value: string | null;
  items: ItemType[] | never[];
}

export default class Picker extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state = {
      open: false,
      value: null,
      items: this.props.dropDownList
    };

    this.setValue = this.setValue.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setItems = this.setItems.bind(this);
  }

  setOpen(open: boolean) {
    this.setState({
      open
    });
  }

  setValue(callback: Function) {
    this.setState(state => ({
      value: callback(state.value)
    }));
  }

  setItems(callback: Function) {
    this.setState(state => ({
      items: callback(state.items)
    }));
  }

  render() {
    const { open, value, items } = this.state;
    return (
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        // @ts-ignore
        setOpen={this.setOpen}
        // @ts-ignore
        setValue={this.setValue}
        // @ts-ignore
        setItems={this.setItems}
      />
    );
  }
}