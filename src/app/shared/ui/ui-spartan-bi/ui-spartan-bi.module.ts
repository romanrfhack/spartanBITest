import { GetItemsOfArrayPipe } from '../../pipes/get-items-of-array.pipe';
import { SpinnerComponent } from './../components/spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersWithChecksComponent } from '../components/filters-with-checks/filters-with-checks.component';
import { InputSearchComponent } from '../components/input-search/input-search.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GetItemOfArrayPipe } from '../../pipes/get-item-of-array.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DonutComponent } from '../charts/donut/donut.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { InformationCardWithChartComponent } from '../information-card-with-chart/information-card-with-chart.component';
import { InformationCardOnlyTextComponent } from '../information-card-only-text/information-card-only-text.component';
import { MapWithBubblesComponent } from '../map-with-bubbles/map-with-bubbles.component';
import { MapModule } from '@progress/kendo-angular-map';
import { MapWithMarkersComponent } from '../map-with-markers/map-with-markers.component';
import { LogoCompanyComponent } from '../logo-company/logo-company.component';
import { InformationCardWithCircularGaugeComponent } from '../information-card-with-circular-gauge/information-card-with-circular-gauge.component';
import { SpartanBiCardComponent } from '../spartan-bi-card/spartan-bi-card.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ExportChartComponent } from '../components/export-chart/export-chart.component';
import { LineComponent } from '../charts/line/line.component';
import { PieComponent } from '../charts/pie/pie.component';
import { BarComponent } from '../charts/bar/bar.component';
import { InformationCardWithDonutChartComponent } from '../information-card-with-donut-chart/information-card-with-donut-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    FiltersWithChecksComponent,
    InputSearchComponent,
    GetItemOfArrayPipe,
    GetItemsOfArrayPipe,
    SpinnerComponent,
    DonutComponent,
    InformationCardWithChartComponent,
    InformationCardOnlyTextComponent,
    MapWithBubblesComponent,
    MapWithMarkersComponent,
    LogoCompanyComponent,
    InformationCardWithCircularGaugeComponent,
    SpartanBiCardComponent,  
    ExportChartComponent,
    LineComponent,
    BarComponent,
    PieComponent,
    InformationCardWithDonutChartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ChartsModule,
    GaugesModule,
    MapModule,
    MatTooltipModule,
    NgApexchartsModule,
  ],
  exports:[
    FiltersWithChecksComponent,
    InputSearchComponent,
    GetItemOfArrayPipe,
    GetItemsOfArrayPipe,
    SpinnerComponent,
    DonutComponent,
    InformationCardWithChartComponent,
    InformationCardOnlyTextComponent,
    MapWithBubblesComponent,
    MapWithMarkersComponent,
    LogoCompanyComponent,
    InformationCardWithCircularGaugeComponent,
    SpartanBiCardComponent,  
    ExportChartComponent,
    LineComponent,
    BarComponent,
    PieComponent,
    InformationCardWithDonutChartComponent
  ]
})
export class UiSpartanBiModule { }
