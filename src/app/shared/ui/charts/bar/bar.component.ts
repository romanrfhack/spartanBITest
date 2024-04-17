import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChartComponent, SeriesVisualArgs } from '@progress/kendo-angular-charts';
import { Element, Circle, Path, Group, geometry} from '@progress/kendo-drawing';
import { Componente } from 'src/app/models/bi';
import { ComponenteModel } from 'src/app/models/seccion.data';
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
      stroke: { color: e.series.color },
      fill: { color: e.series.color }
    });
    

    const path = new Path({
      stroke: { color: e.series.color },
      fill: { color: e.series.color }
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
}
