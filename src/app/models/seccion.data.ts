import ObjectID from "bson-objectid";
import { ENUM_TIPO_DE_COMPONETES } from "../shared/enums/enums";
import { Componente, Seccion, SeccionesData } from "./bi";

export class SeccionesDataModel implements SeccionesData {
    public secciones?: SeccionModel[];
    constructor(metaData:any){
        this.secciones = metaData.secciones.map((item:any) => new SeccionModel(item.seccion))
    }
}

export class SeccionModel implements Seccion {
    public tipo: string = '';
    public label?: string | undefined = '';
    public id: number = 0;
    public items: Componente[] = [];    
    constructor(seccionMetadata : any){
        this.tipo = seccionMetadata.tipo ?? this.tipo
        this.label =  seccionMetadata.label ?? this.label
        this.id = seccionMetadata.id ?? this.id
        this.items = seccionMetadata.items.map((c:any) => new ComponenteModel(c))
    }

    public _buildIdhtml?(){
        console.log(`_buildIdhtml`)
    }
}

export class ComponenteModel implements Componente{
    id: string ='';
    label: string ='';
    nombreComponente = ENUM_TIPO_DE_COMPONETES.NINGUNO;
    values: any;
    icon?: string | undefined;
    selected?: boolean | undefined;
    disabled?: boolean | undefined;
    defaultValueInValues?: any;
    width?:string
    height?:string
    idHtml?:string
    constructor(data: any){
        this.id = data.id ?? this.id
        this.label = data.label ?? this.label
        this.nombreComponente = data.componente ?? this.nombreComponente
        this.values = data.values ?? this.values
        this.icon = data.icon ?? this.icon
        this.selected = data.selected ?? this.selected
        this.disabled = data.disabled ?? this.disabled
        this.width = data.width ?? this.width
        this.height = data.height ?? this.height
        this.idHtml = `C${new ObjectID().toHexString().toString()}`;
    }

}