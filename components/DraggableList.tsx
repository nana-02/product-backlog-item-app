import React, { FC, useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
    ScaleDecorator
} from "react-native-draggable-flatlist";
import { IForm, IItem } from '../interface/IDraggableList';

type IProps = {
  listData: IItem[];
  handleInject: (dataList: IForm[]) => void;
}
export const DraggableList: FC<IProps>  = (props: IProps )=> {
  const windowWidth = useWindowDimensions().width;

  const handleSetData = (data: IItem[]) => {
    const array:IForm[] = [];
    data.forEach(element => {
      let fuga: IForm = {id: 1, title: element.title, DOD: ''};
      array.push(fuga);
    });
    props?.handleInject(array);
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<IItem>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            { backgroundColor: isActive ? "red" : item.backgroundColor, width: windowWidth },
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
        data={props.listData}
        onDragEnd={({ data }) => handleSetData(data)}
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