export type IItem = {
  key: string;
  label: string;
  title?: string;
  height: number;
  width: number;
  backgroundColor: string;
}

export type IAppStore = {
  form?: IItem[];
  setFormData: (newForm: IItem[]) => {};
};