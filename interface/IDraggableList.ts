// アイテム
export type IOrderableListParam = {
  key: string;
  label: string;
  title: string;
  height: number;
  width: number;
  backgroundColor: string;
}

// アプリストア
export type IAppStore = {
  form?: IOrderableListParam[];
  setFormData: (newForm: IOrderableListParam[]) => {};
};