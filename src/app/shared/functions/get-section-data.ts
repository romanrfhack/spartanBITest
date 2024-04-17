
import { SeccionesData } from "src/app/models/bi";
import { ENUM_SECCIONES_LAYOUT, ENUM_TIPO_DE_COMPONETES } from "../enums/enums";

export function getSectionDataByID(metadata: SeccionesData, componente: ENUM_TIPO_DE_COMPONETES , idComponente : number){

    try {
        const seccion = metadata.secciones?.find((seccion:any) => seccion.tipo == ENUM_SECCIONES_LAYOUT.BODY)
        const bodySeccion = seccion?.items.find((item: any) => item.componente == componente && item.id == idComponente );
        return bodySeccion   
    } catch (error) {
        console.error(`No se encuentra los datos para el componente ${componente} con el identificador ${idComponente}`)
        //throw error
    }
    return {}
}