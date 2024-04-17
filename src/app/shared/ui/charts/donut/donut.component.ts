import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent, SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { Componente } from 'src/app/models/bi';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements AfterViewInit {

  
  public data: any
  @ViewChild("chartDonutExport")
  private chart: ChartComponent;

  @Output() eventImage = new EventEmitter<any>()
  @Input() isToExport = false
  @Input()
  set metadataComponente(metadata: any) {
    if(!metadata){
      return
    }
    this._setDataComponente(metadata)
  }
  constructor(){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exportChart()
    }, 500)
  }

  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }

  private _setDataComponente(metadata : Componente){
    setTimeout(() => {
      this.data = metadata
    }, 0)
  }

  public exportChart(): void {
    this.chart.exportImage().then((dataURI) => {
      this.eventImage.emit(dataURI)
    });
  }
}