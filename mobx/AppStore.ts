import { action, observable, makeObservable} from 'mobx';
import defaultForm from '../data/defaultForm.json'
import { IForm, IItem } from '../interface/IDraggableList'

class AppStore {
  @observable.ref form: IItem[] = defaultForm;

  @action('走ってる?') setFormData(newForm: IItem[]){
    this.form = newForm;
  }

  constructor() {
    makeObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;