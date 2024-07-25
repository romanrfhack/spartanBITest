import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent } from '@progress/kendo-angular-charts';
import { Componente } from 'src/app/models/bi';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { saveAs } from "@progress/kendo-file-saver";

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
    if (!metadata) {
      return
    }
    this._setDataComponente(metadata)
  }
  public readonly ESTILO_GRAFICAS = CONSTANTS.ESTILO_GRAFICAS
  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exportChart()
    }, 500)
  }

  private _setDataComponente(metadata: Componente) {
    setTimeout(() => {
      this.lineData = metadata
    }, 0)
  }


  public exportChart(): void {
    console.log('exportChart line')
    this.chart.exportImage().then((dataURI) => {
      this.eventImage.emit(dataURI)
    });
  }

  public onExportImage(): void {
    console.log('exportImage-line hijo', this.lineData.nombreComponente)
    this.chart.exportImage().then((dataURI) => {
      saveAs(dataURI, "chart.png");
    });
  }

  public onExportDatos(): void {
    console.log('exportDatos-line hijo');
    console.log('this.lineData', this.lineData);

    const data = this.lineData.values;
    console.log('data', data);

    const csvData = this.convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'chart-data.csv');
  }

  private convertToCSV(data: any): string {
    const categories = data.categories;
    const seriesData = data.series[0].data;

    let csvContent = "data:text/csv;charset=utf-8,";
    // Add headers
    csvContent += "Category,Value\n";

    // Add data
    categories.forEach((category: string, index: number) => {
      const value = seriesData[index];
      csvContent += `${category},${value}\n`;
    });

    return csvContent;
  }

}


