import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { Componente } from 'src/app/models/bi';
import { ComponenteModel } from 'src/app/models/seccion.data';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent {  

  @ViewChild("chartBarExport")
  private chart: ChartComponent;
  @Output() eventImage = new EventEmitter<any>()
  @Input() isToExport = false
  @Input() set metadataComponente(metadata: any) {
    if(!metadata){
      return
    }
    this._setDataCompoente(metadata)
  }

  public componente: ComponenteModel
  constructor(){}

  private _setDataCompoente(metadata : ComponenteModel){
        this.componente = metadata
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exportChart()
    }, 1000)
  }

  public exportChart(): void {
    this.chart.exportImage().then((dataURI) => {
      this.eventImage.emit(dataURI)
    });
  }
}
