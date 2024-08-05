import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ChartComponent, SeriesVisualArgs, ValueAxisLabels } from '@progress/kendo-angular-charts';
import { Element, Circle, Path, Group, geometry } from '@progress/kendo-drawing';
import { Componente } from 'src/app/models/bi';
import { ComponenteModel } from 'src/app/models/seccion.data';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { saveAs } from "@progress/kendo-file-saver";
import { Subscription } from 'rxjs';
const { transform, Circle: GeomCircle } = geometry;

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, OnDestroy{

  private exportSubscription: Subscription;

  
  @ViewChild("chartBarExport") private chart: ChartComponent;
  @Output() eventImage = new EventEmitter<any>()
  @Input() isToExport = false
  @Input() set metadataComponente(metadata: any) {
    if (!metadata) {
      return
    }
    this._setDataCompoente(metadata)
  }

  //@ViewChild('chartBarExport') chart: ChartComponent;
  @Output() exportImage = new EventEmitter<void>();
  @Output() exportDatos = new EventEmitter<void>();

  public readonly ESTILO_GRAFICAS = CONSTANTS.ESTILO_GRAFICAS
  public componente: ComponenteModel;
  constructor() { }

  ngOnInit() {    
  }

  private _setDataCompoente(metadata: ComponenteModel) {
    this.componente = metadata
    if (!this.isToExport) {
      //this.componente.values.data.sort((a, b) => a - b)
      this.componente.values.data = this.componente.values.data.map((item, index) => {
        return { value: Number(item), valueColor: this.ESTILO_GRAFICAS.primaryColor, category: this.componente.values.categories[index] }
      })
      this.componente.values.data[0].valueColor = this.ESTILO_GRAFICAS.minValueColor
      this.componente.values.data[this.componente.values.data.length - 1].valueColor = this.ESTILO_GRAFICAS.maxValueColor
    }

    console.log("this.componente: ",this.componente)
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

  public radiusEnd = (e: SeriesVisualArgs) => {
    const group = new Group();
    const barSize = -0;
    // var visual: Element = e.createVisual();

    // visual.transform(
    //   geometry
    //     .transform()
    //     .scale(1, barSize / e.rect.size.height, e.rect.center())
    // );
    // group.append(visual)
    var height = e.rect.size.height + barSize;
    var width = e.rect.size.width;
    var radius = height / 2;
    var originY = e.rect.origin.y;
    var originX = e.rect.origin.x;
    var pointX = originX + width - radius;
    var pointY = originY + radius;
    const _geometry = new GeomCircle([pointX, pointY], radius);
    const circle = new Circle(_geometry, {
      stroke: { color: e.dataItem.valueColor },
      fill: { color: e.dataItem.valueColor }
    });


    const path = new Path({
      stroke: { color: e.dataItem.valueColor },
      fill: { color: e.dataItem.valueColor }
    });
    path
      .moveTo(originX, originY)
      .lineTo(pointX, originY)
      .lineTo(pointX, originY + height)
      .lineTo(originX, originY + height)
      .close();


    group.append(circle, path);


    //return visual;
    //group.append()

    return group;
  };

  public valueAxisLabels: ValueAxisLabels = {
    font: 'bold 16px Bebas Neue, sans-serif',
  };

  saludar() {
    console.log('Hola desde el componente hijo!');
  }

  public executeMethodHIJO() {    
    console.log('Método del componente hijo ejecutado');
  }

  ngOnDestroy() {
    this.exportSubscription.unsubscribe();
  }

}
