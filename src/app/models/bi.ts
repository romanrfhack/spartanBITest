import { ENUM_TIPO_DE_COMPONETES } from "../shared/enums/enums";

export interface SeccionesData {
  secciones?: Array<Seccion>;
}


export interface Seccion {
  tipo: string;
  label?: string;
  id: number;
  items: Componente[];
  idHtml?: string 
}

export interface Componente {
  id: string;
  label: string;
  nombreComponente: ENUM_TIPO_DE_COMPONETES;
  values: any;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  defaultValueInValues?: any
  width?:string
  height?:string
  idHtml?:string
  isChartComponent?:boolean
  filterName?:string
}

