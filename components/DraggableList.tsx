import React, { FC } from 'react';
// component
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
    ScaleDecorator
} from "react-native-draggable-flatlist";
// interface
import { IForm, IItem } from '../interface/IDraggableList';
// utils
import { uuid, getWindowWidth } from '../utils/UDraggableList';


type IProps = {
  ordableList: IItem[];
  setFormData: (dataList: IForm[]) => void;
}
export const DraggableList: FC<IProps>  = (props: IProps )=> {
  // storeにformリストデータのセットハンドラ
  const handleSetFormData = (data: IItem[]) => {
    const formList:IForm[] = [];
    data.forEach(element => {
      let form: IForm = {id: uuid.v1(), title: element.title, DOD: ''};
      formList.push(form);
    });
    props?.setFormData(formList);
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<IItem>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor, width: getWindowWidth },
          ]}
        >
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={[styles.view]}>
      <DraggableFlatList
        data={props.ordableList}
        onDragEnd={({ data }) => handleSetFormData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  rowItem: {
    height: 50,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  view: {
    marginTop: 20,
    height: 450,
  }
});