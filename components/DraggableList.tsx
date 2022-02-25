import React, { FC, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
    ScaleDecorator
} from "react-native-draggable-flatlist";
import data from '../data/data.json'

import { IForm } from '../interface/IForm';

const NUM_ITEMS = data.length;
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type IItem = {
  key: string;
  label: string;
  title?: string;
  height: number;
  width: number;
  backgroundColor: string;
}
const getInitialData = (formData: IForm[] ) => {
  const initialData: IItem[] = [...Array(NUM_ITEMS)].map((d, index) => {
    const backgroundColor = getColor(index);
    return {
      key: `item-${index}`,
      label: String(index) + "",
      height: 100,
      title: formData[index].title,
      width: 60 + Math.random() * 40,
      backgroundColor,
    };
  });
  return initialData;
}


type IProps = {
  formData: IForm[] 
}
export const DraggableList: FC<IProps>  = (props: IProps )=> {
  const [data, setData] = useState(getInitialData(props.formData));
  const windowWidth = useWindowDimensions().width;
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
        data={data}
        onDragEnd={({ data }) => setData(data)}
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