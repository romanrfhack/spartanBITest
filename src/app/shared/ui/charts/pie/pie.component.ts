import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent, SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { Componente } from 'src/app/models/bi';

import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit {
  @ViewChild("chartPieExport")
  private chart: ChartComponent;
  @Output() eventImage = new EventEmitter<any>()
  @Input() isToExport = false
  public lineData: any
  @Input()
  set metadataComponente(metadata: any) {
    if(!metadata){
      return
    }
    this._setDataComponente(metadata)
  }
  constructor(){}
  
  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }

  private _setDataComponente(metadata : Componente){
    setTimeout(() => {
        this.lineData = metadata
    }, 0)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exportChart()
    }, 500)
  }

  public exportChart(): void {
    this.chart.exportImage().then((dataURI) => {
      this.eventImage.emit(dataURI)
    });
  }

}
