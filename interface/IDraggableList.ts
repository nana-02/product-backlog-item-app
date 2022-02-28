// フォーム
export type IForm = {
  id: number,
  title?: string,
  DOD?: string
}

// アイテム
export type IItem = {
  key: string;
  label: string;
  title?: string;
  height: number;
  width: number;
  backgroundColor: string;
}

// アプリストア
export type IAppStore = {
  form?: IForm[];
  setFormData: (newForm: IForm[]) => {};
};