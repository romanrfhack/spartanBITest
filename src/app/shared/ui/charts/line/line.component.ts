import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { Componente } from 'src/app/models/bi';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements AfterViewInit {
  @ViewChild("chartLineExport")
  private chart: ChartComponent;

  public lineData: any
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

  private _setDataComponente(metadata : Componente){
    setTimeout(() => {
        this.lineData = metadata
    }, 0)
  }

  
  public exportChart(): void {
    this.chart.exportImage().then((dataURI) => {
      this.eventImage.emit(dataURI)
    });
  }
}
