import { Component } from '@angular/core';
import { ChartsModule, SeriesLabelsContentArgs } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';
import { take } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { SeccionesData } from 'src/app/models/bi';
import { SeccionModel, SeccionesDataModel } from 'src/app/models/seccion.data';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SpartanDashboard } from 'src/app/models/dashboard.data';
import { Router } from '@angular/router';
import { BiService } from 'src/app/services/bi.service';
import { BlockComponent } from 'src/app/shared/ui/components/block/block.component';

interface ComponenteConfig {
  [key: string]: string | number;
}

@Component({
  selector: 'app-select-dashboard',
  templateUrl: './select-dashboard.component.html',
  styleUrls: ['./select-dashboard.component.scss']
})
export class SelectDashboardComponent {
  @BlockUI('login-full') blockUI: NgBlockUI | undefined;
  dashboards: SpartanDashboard[] | null = null;
    
  componentesBody : ComponenteConfig[] = [{     
      componente1: "filter-checks-with-search",
      div1Width: 20, 
      div1Height: 100,             
      componente2: "chart-line",
      div2Width: 40, 
      div2Height: 100,        
    },{     
      componente1: "filter-checks-with-search",
      div1Width: 20, 
      div1Height: 100,                
    }]
    // componente4: "chart-bar",
    // div4Width: 40, 
    // div4Height: 100,   

    items = [
    {
        id: "1",
        label: "Selecciona una o mas unidades",
        componente: "filter-checks-with-search",                        
        div1Width: 30, 
        divHeight: 100,             
        values: []
    },
    {
        id: "2",
        label: "Grafica de lineas",
        componente: "chart-line",                        
        div2Width: 30, 
        divHeight: 100,             
        values: []
    },
    {
        id: "3",
        label: "Grafica de pastel",
        componente: "chart-pie",                        
        div3Width: 30, 
        divHeight: 100,             
        values: []
    },
    {
        id: "4",
        label: "Grafica de barras",
        componente: "chart-bar",                        
        div4Width: 30, 
        divHeight: 100,             
        values: []
    }
]                


  public autofit = true;
  public data = [
    {
      kind: "Solar",
      share: 0.052,
    },
    {
      kind: "Wind",
      share: 0.225,
    },
    {
      kind: "Other",
      share: 0.192,
    },
    {
      kind: "Hydroelectric",
      share: 0.175,
    },
    {
      kind: "Nuclear",
      share: 0.238,
    },
    {
      kind: "Coal",
      share: 0.118,
    },
  ];

  itemsComponents = [
    {
      id:"",
      label:"1",
      gridColumn:"1/3",
      gridRow:"1/3",
      background:"red",
      minHeight:"300px"
    },
    {
      id:"",
      label:"1",
      gridColumn:"1/3",
      gridRow:"2/6",
      background:"green",
      minHeight:"200px"
    },
    {
      id:"",
      label:"2",
      gridColumn:"3/6",
      gridRow:"1/6",
      background:"black"

    },
    {
      id:"",
      label:"3",
      gridColumn:"6/12",
      gridRow:"1/6",
      background:"blue"
    },
    {
      id:"",
      label:"3",
      gridColumn:"1/12",
      gridRow:"6/12",
      background:"cyan",
      minHeight:"300px"
    },
    {
      id:"",
      label:"3",
      gridColumn:"1 / 10",
      gridRow:"13 / 15",
      background:"yellow",
      minHeight:"600px"
    },
    {
      id:"",
      label:"3",
      gridColumn:"10 / 12",
      gridRow:"13 / 14",
      background:"gray",
      minHeight:"250px"
    },
    {
      id:"",
      label:"3",
      gridColumn:"10 / 12",
      gridRow:"14 / 15",
      background:"pink",
      minHeight:"250px"
    },
    
  ]
  
  public metada:any = null
  public componentsMetadata :any = null
  public templateBlockModalUiComponent: BlockComponent = BlockComponent;

  constructor(
    private intl: IntlService, 
    private _dashboardService: DashboardService,     
    private router: Router,
    private biService: BiService) {
      console.log(`app-bi - Dashboards`, this._dashboardService.arrayDashboard)
      if(this._dashboardService?.dashboards?.length > 0){
        this.dashboards = this._dashboardService.dashboards
      }                  
  }

  public labelContent(e: SeriesLabelsContentArgs): string {
    return e.category;
  }

  public labelContent1(args: SeriesLabelsContentArgs): string {
    return `${args.dataItem.category} years old: ${this.intl.formatNumber(
      args.dataItem.value,
      "p2"
    )}`;
  }

  calculateHeight(): string {    
    const numColumns = 1;    
    const heightPercentage = 80 / numColumns;
    return heightPercentage + 'vh';
  }

  ngOnInit(): void {

    this._getDashboards()

    this._dashboardService.metaDataGeneral$.subscribe((data) => {
      this.metada  = data
      this._builtComponentesBody(this.metada)
    })

    this._dashboardService.metaDataBody$.subscribe((data) =>{
      this.metada ={...this.metada , ...data}
      this._builtComponentesBody(this.metada)
    })
  }

private _builtComponentesBody(metadata: SeccionesDataModel): void {
      const _meta = metadata.secciones?.find((m: SeccionModel) => m.id == 3 || m.tipo == "body")
      if (_meta) {
        this.componentsMetadata = _meta
        console.log(`_builtComponentesBody`, this.componentsMetadata)
      }
  }

  onFiltersWithChecks(data: any ){
    console.log(`onFiltersWithChecks`, data)
  }

  onSearchFiltersWithChecks(data: any ){
    console.log(`onSearchFiltersWithChecks`, data)
  }

  public get ENUM_TIPO_DE_COMPONETES() : typeof ENUM_TIPO_DE_COMPONETES  {
    return ENUM_TIPO_DE_COMPONETES;
  }

  private _getDashboards() {
    try {      
      this.blockUI?.start()
      // let dashboards igual a elementos de this._dashboardService.arrayDashboard separados por una coma
      let dashboards = this._dashboardService.arrayDashboard.join(',')
      console.log(`dashboards`, dashboards)
      this._dashboardService.getSpartan_Dashboard(dashboards).pipe(take(1)).subscribe((data) => {
        this.blockUI?.stop()
        // this.metada = data
        console.log(`_getDashboards - data`, data)
        this.dashboards = data.Spartan_Dashboards;
        this._dashboardService.dashboards = this.dashboards
      }, err => {
        this.blockUI?.stop()
        console.log(`err`, err)
      }) 
    } catch (error) {
      this.blockUI?.stop()
       console.log(`error`)
    }    
  }

  onCardClick(dashboardId: number): void {   
    this._dashboardService.idDashboard = dashboardId;
    this.router.navigate(['/dashboard/bi', dashboardId]);
    console.log(`Navegar al dashboardId`, dashboardId)
  }

}
