import { ChartComponent } from '@progress/kendo-angular-charts';
import { PdfGeneratorServiceService } from './../../services/pdf/pdf-generator-service.service';
import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Componente } from 'src/app/models/bi';
import { ExportChartComponent } from '../components/export-chart/export-chart.component';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ENUM_TIPO_DE_COMPONETES } from '../../enums/enums';
import { DonutComponent } from '../charts/donut/donut.component';
import { BarComponent } from '../charts/bar/bar.component';
import { LineComponent } from '../charts/line/line.component';
import { PieComponent } from '../charts/pie/pie.component';
import { MatIconRegistry } from '@angular/material/icon';
import { saveAs } from "@progress/kendo-file-saver";
// import printJS from 'print-js'
import { ExportService } from '../../services/ExportService ';
@Component({
  selector: 'app-spartan-bi-card',
  templateUrl: './spartan-bi-card.component.html',
  styleUrls: ['./spartan-bi-card.component.scss']
})
export class SpartanBiCardComponent implements AfterViewInit, OnInit {
  @ViewChildren(ChartComponent) charts: QueryList<ChartComponent>;
  @ViewChild('kendo-chart') public chart: ChartComponent;      
  @ContentChild(BarComponent) appBarComponent: BarComponent;
  @ContentChild(LineComponent) appLineComponent: LineComponent;
  //LineComponent

  @Input() componente: Componente
  

  isFullView: boolean = false
  constructor(
    private PdfGeneratorServiceService: PdfGeneratorServiceService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private viewRef: ViewContainerRef,
    private _matIconRegistery:MatIconRegistry,
    private exportService: ExportService
  ) {  }

  ngOnInit(): void {
    console.log('componente barComponent', this.appBarComponent)
  }

  getElementById(id: string): HTMLElement {
    return this.elementRef.nativeElement.querySelector(`#${id}`);
  }

  ngAfterViewInit(): void {    
    if (this.appBarComponent) {
      console.log("BarComponent inicializado correctamente");
    } else {
      console.error("BarComponent no se pudo inicializar");
    }    
  }

  onFullView() {
    this.isFullView = !this.isFullView
    const body = document.getElementsByTagName('body');
    if (body[0].classList.contains('body-full-view')) {
      body[0].classList.remove('body-full-view');
    } else {
      body[0].classList.add('body-full-view');
    }
  }

  onExportImage() {
    console.log('exportImage-padre')        
    if (this.componente.nombreComponente == ENUM_TIPO_DE_COMPONETES.BAR_CHART) {
      console.log("BarComponent inicializado correctamente");
      this.appBarComponent.onExportImage();
    }

    if (this.componente.nombreComponente == ENUM_TIPO_DE_COMPONETES.LINE_CHART) {
      this.appLineComponent.onExportImage();
      console.log("LineComponent inicializado correctamente");
    }    
  }

  onExportDatos() {

    if (this.componente.nombreComponente == ENUM_TIPO_DE_COMPONETES.BAR_CHART) {
      console.log("BarComponent inicializado correctamente");
      this.appBarComponent.onExportDatos();
    }

    if (this.componente.nombreComponente == ENUM_TIPO_DE_COMPONETES.LINE_CHART) {
      this.appLineComponent.onExportDatos();
      console.log("LineComponent inicializado correctamente");
    }
    
  }
  

  async onExport() {
    try {
      const compRef = this._getComponentChartDinamically()
      compRef.setInput('isToExport', true)
      compRef.setInput('metadataComponente', this.componente)
      const image = await firstValueFrom(compRef.instance.eventImage)
      // printJS({printable: image, type: 'image' ,header:'' , documentTitle:'',})
      this.chart.exportImage().then((dataURI) => {
        saveAs(dataURI, "chart.png");
      });      
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  private _getComponentChartDinamically() {
    this.viewRef.clear()
    switch (this.componente.nombreComponente) {
      case ENUM_TIPO_DE_COMPONETES.BAR_CHART:
        return this.viewRef.createComponent(BarComponent)
        break;
      case ENUM_TIPO_DE_COMPONETES.LINE_CHART:
        return this.viewRef.createComponent(LineComponent)
        break;
      case ENUM_TIPO_DE_COMPONETES.DONUT_CHART:
        return this.viewRef.createComponent(DonutComponent)
        break;
      case ENUM_TIPO_DE_COMPONETES.PIE_CHART:
        return this.viewRef.createComponent(PieComponent)
        break;
      default:
        return null
        break;
    }
  }

  llamarMetodoHijo() {
    console.log("SpartanBiCardComponent Padre");
    if (this.appBarComponent) {
      console.log("appBarComponent Padre");
      this.appBarComponent.executeMethodHIJO();
    }else
    {
      console.log("No se pudo inicializar appBarComponent Padre");
    }
  }

}
