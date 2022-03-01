import { action, observable, makeObservable} from 'mobx';
import defaultForm from '../data/defaultForm.json'
import { IOrderableListParam } from '../interface/IDraggableList'

class AppStore {
  @observable.ref form: IOrderableListParam[] = defaultForm;

  @action setFormData(newForm: IOrderableListParam[]){
    this.form = newForm;
  }

  constructor() {
    makeObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;