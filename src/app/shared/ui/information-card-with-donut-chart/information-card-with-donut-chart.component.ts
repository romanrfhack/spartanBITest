import { Component, Input } from '@angular/core';
import { ComponenteModel } from 'src/app/models/seccion.data';
import { INFORMATION_DONUT } from './mock';
import { SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexPlotOptions,
  ApexGrid,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  grid: ApexGrid
  labels: any;
};
@Component({
  selector: 'app-information-card-with-donut-chart',
  templateUrl: './information-card-with-donut-chart.component.html',
  styleUrls: ['./information-card-with-donut-chart.component.scss']
})
export class InformationCardWithDonutChartComponent {
  public value = 50;
  public dataComponete: ComponenteModel  = INFORMATION_DONUT
  public chartOptions: Partial<ChartOptions>;
  colorSeries:['#c195ef', '#63a6ed'];
  @Input()
  set metadataComponente(metadata: any) {
    if (!metadata) {
      return
    }
    this._setDataComponente(metadata)
  }
  constructor() {
    this.chartOptions = {
      chart: {
        type: "donut",
        width: 150,
        height:160
      },

      
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          donut: {
            size: '88',
            labels:{
              show:false
            }, 
             
          },
          expandOnClick:false,
          dataLabels:{
            offset:0,
            minAngleToShowLabel:190

          }
        },
      },
      grid: {
        padding: {
          bottom: -90,
          top:10,
          left:2
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };

    console.log(`constructor`, this.dataComponete)
  }

  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }


  private _setDataComponente(metadata: ComponenteModel) {
    setTimeout(() => {
      this.dataComponete = metadata ?? INFORMATION_DONUT
    }, 0)
  }


}
