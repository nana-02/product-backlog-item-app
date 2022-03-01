// フォーム
export type IForm = {
  id: string,
  title?: string,
  DOD?: string
}

// アイテム
export type IOrderableListParam = {
  key: string;
  label: string;
  title?: string;
  height: number;
  width: number;
  backgroundColor?: string;
}

// アプリストア
export type IAppStore = {
  form?: IForm[];
  setFormData: (newForm: IForm[]) => {};
};