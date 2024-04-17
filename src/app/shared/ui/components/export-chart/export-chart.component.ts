import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { ComponenteModel } from 'src/app/models/seccion.data';

@Component({
  selector: 'app-export-chart',
  templateUrl: './export-chart.component.html',
  styleUrls: ['./export-chart.component.scss']
})
export class ExportChartComponent implements AfterViewInit {

  @ViewChild("chartExport")
  private chart: ChartComponent;

  @Input() componente: ComponenteModel
  @Output() eventImage = new EventEmitter<any>()

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
