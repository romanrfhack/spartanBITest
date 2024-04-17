import { ChartComponent } from '@progress/kendo-angular-charts';
import { PdfGeneratorServiceService } from './../../services/pdf/pdf-generator-service.service';
import { AfterViewInit, Component, ContentChild, ElementRef, Input, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { Componente } from 'src/app/models/bi';
import { ExportChartComponent } from '../components/export-chart/export-chart.component';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ENUM_TIPO_DE_COMPONETES } from '../../enums/enums';
import { DonutComponent } from '../charts/donut/donut.component';
import { BarComponent } from '../charts/bar/bar.component';
import { LineComponent } from '../charts/line/line.component';
import { PieComponent } from '../charts/pie/pie.component';

@Component({
  selector: 'app-spartan-bi-card',
  templateUrl: './spartan-bi-card.component.html',
  styleUrls: ['./spartan-bi-card.component.scss']
})
export class SpartanBiCardComponent implements AfterViewInit {
  @ViewChildren(ChartComponent) charts: QueryList<ChartComponent>;
  @ViewChild('kendo-chart') public chart: ChartComponent;

  @Input() componente: Componente

  isFullView: boolean = false
  constructor(
    private PdfGeneratorServiceService: PdfGeneratorServiceService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private viewRef: ViewContainerRef
  ) {

  }

  getElementById(id: string): HTMLElement {
    return this.elementRef.nativeElement.querySelector(`#${id}`);
  }

  ngAfterViewInit(): void {
    console.log(`compoennte`, this.componente)
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

  async onExport() {
    try {
      
      const compRef = this._getComponentChartDinamically()
      compRef.setInput('metadataComponente', this.componente)
      compRef.setInput('isToExport', true)
      const image = await firstValueFrom(compRef.instance.eventImage)
      if (image) {
        var docDefinition = {
          content: [
            'test to export chart',
            {
              image: image,
              fit: [300, 300],
            }
          ]
        };

        this.PdfGeneratorServiceService.generatePDF(docDefinition, "pdftest")
        compRef.destroy()
      }
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
}
