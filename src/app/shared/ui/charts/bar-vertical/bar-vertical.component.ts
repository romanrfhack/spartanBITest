import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import {
  DragEvent,
  DragStartEvent,
  DragEndEvent,
  ZoomStartEvent,
  ZoomEvent,
  ZoomEndEvent,
} from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { ChartComponent, SeriesVisualArgs, ValueAxisLabels } from '@progress/kendo-angular-charts';
import { ComponenteModel } from "src/app/models/seccion.data";
import { CONSTANTS } from "src/app/shared/constants/constants";


@Component({
  selector: 'app-bar-vertical',
  templateUrl: './bar-vertical.component.html',
  styleUrls: ['./bar-vertical.component.scss']
})
export class BarVerticalComponent implements OnInit, OnDestroy {
  data = [];
  @Output() exportImage = new EventEmitter<void>();
  @Output() exportDatos = new EventEmitter<void>();
  @ViewChild("chartBarExport") private chart: ChartComponent;
  public componente: ComponenteModel;
  @Input() isToExport = false
  public readonly ESTILO_GRAFICAS = CONSTANTS.ESTILO_GRAFICAS
  @Input()
  set metadataComponente(metadata: any) {
    if (!metadata) {
      return
    }
    this._setDataCompoente(metadata)
  }

  constructor() {
    // for (let idx = 0; idx < 500; idx++) {
    //   this.data.push({
    //     value: Math.floor(Math.random() * 100) + 1,
    //     category: new Date(2000, 0, idx),
    //   });
    // }
  }

  private _setDataCompoente(metadata: ComponenteModel) {
    this.componente = metadata
    console.log("this.componente: ",this.componente)
    console.log("this.data: ",this.data)
    const values = this.componente.values?.data;
    const categories = this.componente.values?.categories;
    console.log("values: ",values)
    console.log("categories: ",categories)

    for (let idx = 0; idx < values.length; idx++) {
      this.data.push({
        value: values[idx],
        category: categories[idx],
      });
    }
    console.log("this.data 1: ",this.data)
    // if (!this.isToExport) {
    //   this.componente.values.data.sort((a, b) => a - b)
    // this.data.push({
    //       value: this.componente.values[0].data,
    //       category: this.componente.values[0].categories,
    //     });
    //   this.componente.values.data = this.componente.values.data.map((item, index) => {
    //     return { value: Number(item), valueColor: this.ESTILO_GRAFICAS.primaryColor, category: this.componente.values.categories[index] }
    //   })
    //   this.componente.values.data[0].valueColor = this.ESTILO_GRAFICAS.minValueColor
    //   this.componente.values.data[this.componente.values.data.length - 1].valueColor = this.ESTILO_GRAFICAS.maxValueColor
    // }

  }

  public categoryAxis = {
    name: "category",
    max: new Date(2000, 1, 0),
    maxDivisions: 10,
  };

  public valueAxis = {
    name: "value",
    labels: {
      format: "#.00",
    },
  };

  ngOnInit() {
  }

  public onDragStart(args: DragStartEvent): void {
    console.log("dragStart", this.axisRanges(args));
  }

  public onDrag(args: DragEvent): void {
    console.log("drag", this.axisRanges(args));
  }

  public onDragEnd(args: DragEndEvent): void {
    console.log("dragEnd", this.axisRanges(args));
  }

  public onZoomStart(args: ZoomStartEvent): void {
    console.log("zoomStart", this.axisRanges(args));
  }

  public onZoom(args: ZoomEvent): void {
    console.log("zoom", this.axisRanges(args));
  }

  public onZoomEnd(args: ZoomEndEvent): void {
    console.log("zoomEnd", this.axisRanges(args));
  }

  private axisRanges(
    args:
      | DragStartEvent
      | DragEvent
      | DragEndEvent
      | ZoomStartEvent
      | ZoomEvent
      | ZoomEndEvent
  ): string {
    const { value, category } = args.axisRanges;
    const valueRange = value ? `value: ${value.min} - ${value.max};` : "";
    const categoryRange = category
      ? `category: ${category.min} - ${category.max};`
      : "";

    return valueRange + categoryRange;
  }

  public onExportImage(): void {
    console.log('exportImage-bar hijo', this.componente.nombreComponente)
    this.chart.exportImage().then((dataURI) => {
      saveAs(dataURI, "chart.png");
    });
  }

  public onExportDatos(): void {
    console.log('exportDatos-bar hijo')
    const data = this.componente.values.data;
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

  ngOnDestroy() {

  }
}