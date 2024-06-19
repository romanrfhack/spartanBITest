import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent, SeriesVisualArgs, ValueAxisLabels } from '@progress/kendo-angular-charts';
import { Element, Circle, Path, Group, geometry } from '@progress/kendo-drawing';
import { Componente } from 'src/app/models/bi';
import { ComponenteModel } from 'src/app/models/seccion.data';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
const { transform, Circle: GeomCircle } = geometry;

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
    if (!metadata) {
      return
    }
    this._setDataCompoente(metadata)
  }
  public readonly ESTILO_GRAFICAS = CONSTANTS.ESTILO_GRAFICAS
  public componente: ComponenteModel;
  constructor() { }

  private _setDataCompoente(metadata: ComponenteModel) {
    this.componente = metadata
    if (!this.isToExport) {
      this.componente.values.data.sort((a, b) => a - b)
      this.componente.values.data = this.componente.values.data.map((item, index) => {
        return { value: Number(item), valueColor: this.ESTILO_GRAFICAS.primaryColor, category: this.componente.values.categories[index] }
      })
      this.componente.values.data[0].valueColor = this.ESTILO_GRAFICAS.minValueColor
      this.componente.values.data[this.componente.values.data.length - 1].valueColor = this.ESTILO_GRAFICAS.maxValueColor
    }

    console.log("this.componente: ",this.componente)
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

}
