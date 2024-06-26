import { Component, Input } from '@angular/core';
import { SeriesVisualArgs } from '@progress/kendo-angular-charts';
import { Element, geometry } from "@progress/kendo-drawing";
import { Componente } from 'src/app/models/bi';
import { ENUM_TIPO_DE_COMPONETES } from '../../enums/enums';
import { getSectionDataByID } from '../../functions/get-section-data';

@Component({
  selector: 'app-information-card-with-chart',
  templateUrl: './information-card-with-chart.component.html',
  styleUrls: ['./information-card-with-chart.component.scss']
})
export class InformationCardWithChartComponent {
  public value = 50;
  public dataComponete: Componente | null = null
  @Input()
  set metadataComponente(metadata: any) {
    if(!metadata){
      return
    }
    this._setDataComponente(metadata)
  }
  constructor(){}

  private _setDataComponente(metadata : Componente){
    setTimeout(() => {
        this.dataComponete = metadata

        // console.log(this.dataComponete)
    }, 0)
  }
}
