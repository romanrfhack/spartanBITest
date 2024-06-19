import ObjectID from "bson-objectid";
import { ENUM_TIPO_DE_COMPONETES, TYPE_CHARTS } from "../shared/enums/enums";
import { Componente, Seccion, SeccionesData } from "./bi";
import { CONSTANTS } from "../shared/constants/constants";

export class SeccionesDataModel implements SeccionesData {
    public secciones?: SeccionModel[];
    constructor(metaData: any) {
        this.secciones = metaData.secciones.map((item: any) => new SeccionModel(item.seccion))
    }
}

export class SeccionModel implements Seccion {
    public tipo: string = '';
    public label?: string | undefined = '';
    public id: number = 0;
    public items: Componente[] = [];
    constructor(seccionMetadata: any) {
        this.tipo = seccionMetadata.tipo ?? this.tipo
        this.label = seccionMetadata.label ?? this.label
        this.id = seccionMetadata.id ?? this.id
        this.items = seccionMetadata.items.map((c: any) => new ComponenteModel(c))
    }

    public _buildIdhtml?() {
        console.log(`_buildIdhtml`)
    }
}

export class ComponenteModel implements Componente {
    id: string = '';
    label: string = '';
    nombreComponente = ENUM_TIPO_DE_COMPONETES.NINGUNO;
    values: any;
    icon?: string | undefined;
    selected?: boolean | undefined;
    disabled?: boolean | undefined;
    defaultValueInValues?: any;
    width?: string
    height?: string
    idHtml?: string
    isChartComponent?: boolean
    filterName?:string = ''    
    constructor(data: any) {
        this.id = data.id ?? this.id
        this.nombreComponente = data.componente ?? this.nombreComponente
        this.isChartComponent = this._setIsChartComponent()
        this.label = data.label ?? this.label
        this.values = data.values ?? this.values
        this.icon = data.icon ?? this.icon
        this.selected = data.selected ?? this.selected
        this.disabled = data.disabled ?? this.disabled
        this.width = this._setWidth(data.width) ?? this.width
        this.height = this._setHeigth(data.divHeight) ?? this.height  //this.height 
        this.idHtml = `C${new ObjectID().toHexString().toString()}`;
        this.filterName = data.value ?? this.filterName
    }

    private _setIsChartComponent?() {
        return TYPE_CHARTS.includes(this.nombreComponente)
    }

    private _setWidth?(width: string = '0') {
        const widthScreen =  window.innerWidth;

        const MARGIN = 1;
        if (this.isChartComponent) {
            return `${(this._getWindowWidth(Number(width)) - MARGIN).toString()}px`
        }else{
            return `${(this._getWindowWidth(Number(width)) - MARGIN).toString()}px`
        }
    }

    private _getWindowWidth?(width:number = 0 ){
        try {
            const DIVISOR = 100
            return (width * CONSTANTS.WINDOWS.WIDTH) / DIVISOR
        } catch (error) {
            return 0
        }
    }

    
    private _setHeigth?(div1Height: string = '0') {                
        return `${Number(div1Height)}px`       
    }

}