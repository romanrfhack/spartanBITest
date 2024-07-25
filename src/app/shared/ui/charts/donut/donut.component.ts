import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent, SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { Componente } from 'src/app/models/bi';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { saveAs } from "@progress/kendo-file-saver";

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
    console.log('exportChart donut')
    this.chart.exportImage().then((dataURI) => {
      this.eventImage.emit(dataURI)
    });
  }

  public onExportImage(): void {
    console.log('exportImage-bar hijo')
    this.chart.exportImage().then((dataURI) => {
      saveAs(dataURI, "chart.png");
    });
  }

  public onExportDatos(): void {
    console.log('exportDatos-bar hijo')
    const data = this.data.values.data;
    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'chart-data.csv');
  }

  private convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);
    return array.map(it => {
      return Object.values(it).toString();
    }).join('\n');
  }

}