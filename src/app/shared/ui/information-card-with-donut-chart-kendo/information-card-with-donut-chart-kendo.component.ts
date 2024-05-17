import { Component } from '@angular/core';
import { SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { ComponenteModel } from 'src/app/models/seccion.data';
import { INFORMATION_DONUT_KENDO } from './mock';

@Component({
  selector: 'app-information-card-with-donut-chart-kendo',
  templateUrl: './information-card-with-donut-chart-kendo.component.html',
  styleUrls: ['./information-card-with-donut-chart-kendo.component.scss']
})
export class InformationCardWithDonutChartKendoComponent {
  public dataComponete: ComponenteModel  = INFORMATION_DONUT_KENDO
  set metadataComponente(metadata: any) {
    if (!metadata) {
      return
    }
    this._setDataComponente(metadata)
  }

  constructor(){}

  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }


  private _setDataComponente(metadata: ComponenteModel) {
    setTimeout(() => {
      this.dataComponete = metadata ?? INFORMATION_DONUT_KENDO
    }, 0)
  }
}
