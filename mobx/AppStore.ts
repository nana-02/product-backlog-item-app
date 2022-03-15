import { action, observable, makeObservable } from 'mobx';
import defaultForm from '../data/defaultForm.json';
import { IItem } from '../interface/IDraggableList';
import { persist, create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
class AppStore {
  @persist('list') @observable form: IItem[] = defaultForm;

  @action setFormData(newForm: IItem[]) {
    this.form = getDraggableItemDataFromForm(newForm);
  }
  constructor() {
    makeObservable(this);
  }
}
const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

// create the state
const appStore = new AppStore()
hydrate('appStore', appStore).then(() => console.log('appStore has been hydrated'))
export default appStore;

// 色の取得
const getColor = (i: number, length: number) => {
  if (length === 1) {
    return 'rgb(0, 128, 255)';
  }
  const multiplier = 255 / (length - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
};

// フォームデータからドラッグに必要なデータを取得する
const getDraggableItemDataFromForm = (formData: IItem[]) => {
  const initialData: IItem[] = [...Array(formData.length)].map((d, index) => {
    const backgroundColor = getColor(index, formData.length);
    return {
      id: formData[index].id,
      key: `item-${index}`,
      label: String(index) + '',
      height: 100,
      title: formData[index].title,
      dod: formData[index].dod,
      width: 60 + Math.random() * 40,
      backgroundColor,
    };
  });
  return initialData;
};