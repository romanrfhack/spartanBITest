export interface Section {
  tipo: string;
  label: string;
  id: number;
  items: Item[];
}

export interface Item {
  id: string;
  label: string;
  nombreComponente: string;
  filterName: string;
  isChartComponent: boolean;
  values: Value[];
  width: string;
  height: string;
  idHtml: string;
}

export interface Value {
  id: string;
  value: string;
  label: string;
  icon: string;
  selected: boolean;
  disabled: boolean;
}
