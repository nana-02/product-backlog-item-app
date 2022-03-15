export type IItem = {
  id: string;
  key: string;
  label: string;
  title?: string;
  dod?: string;
  height: number;
  width: number;
  backgroundColor: string;
}

export type IAppStore = {
  form?: IItem[];
  setFormData: (newForm: IItem[]) => {};
};
