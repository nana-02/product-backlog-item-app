import { action, observable, makeObservable} from 'mobx';
import defaultForm from '../data/defaultForm.json'
import { IForm } from '../interface/IDraggableList'

class AppStore {
  @observable.ref form: IForm[] = defaultForm;

  @action('走ってる?') setFormData(newForm: IForm[]){
    this.form = newForm;
  }

  constructor() {
    makeObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;