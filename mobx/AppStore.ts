import { action, observable, makeObservable} from 'mobx';
import defaultForm from '../data/defaultForm.json'
import { IForm } from '../interface/IForm'

class AppStore {
  @observable form: IForm[] = defaultForm;

  @action setFormData(newForm: IForm[]){
    this.form = newForm;
  }

  constructor() {
    makeObservable(this);
  }
}

const appStore = new AppStore();
export default appStore;