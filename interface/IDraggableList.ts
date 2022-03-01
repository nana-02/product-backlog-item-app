<<<<<<< HEAD
export type IItem = {
=======
// フォーム
export type IForm = {
  id: string,
  title?: string,
  DOD?: string
}

// アイテム
export type IOrderableListParam = {
>>>>>>> a5746c148ba5e1e2c51d5ab228912cd609e00dba
  key: string;
  label: string;
  title?: string;
  height: number;
  width: number;
<<<<<<< HEAD
  backgroundColor: string;
}

export type IAppStore = {
  form?: IItem[];
  setFormData: (newForm: IItem[]) => {};
=======
  backgroundColor?: string;
}

// アプリストア
export type IAppStore = {
  form?: IForm[];
  setFormData: (newForm: IForm[]) => {};
>>>>>>> a5746c148ba5e1e2c51d5ab228912cd609e00dba
};