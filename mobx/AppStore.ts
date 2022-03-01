import { action, observable, makeObservable} from 'mobx';
import defaultForm from '../data/defaultForm.json';
import { IItem } from '../interface/IDraggableList';
import { persist, create } from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
class AppStore {
  @persist('list') @observable form: IItem[] = defaultForm;

  @action setFormData(newForm: IItem[]){
    this.form = newForm;
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