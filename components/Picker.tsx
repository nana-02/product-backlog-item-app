import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';

type IProps = {
  dropDownList: ItemType[];
  selectDropDownList: (value: string) => void;
  pickerItems: React.Dispatch<React.SetStateAction<ItemType[]>>
}

export const Picker: FC<IProps>  = (props: IProps )=> {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const handleSelectDropDownList = (callback: Function) => {
    props.selectDropDownList(callback(value));
    setValue(callback(value));
  }

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={props.dropDownList}
      setOpen={setOpen}
      // @ts-ignore
      setValue={( value ) => handleSelectDropDownList(value)}
      setItems={props.pickerItems}
    />
  );
}

export default Picker;