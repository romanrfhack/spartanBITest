import { LocalStorageService } from './../shared/services/local-storage.service';
import { take } from 'rxjs';
import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockComponent } from '../shared/ui/components/block/block.component';
import { AuthService } from '../services/auth.service';
import { CONSTANTS } from '../shared/constants/constants';
import { SeccionesData } from '../models/bi';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  itemsComponents = [
    {
      id: "",
      label: "1",
      gridColumn: "1/3",
      gridRow: "1/3",
      background: "red",
      minHeight: "300px"
    },
    {
      id: "",
      label: "1",
      gridColumn: "1/3",
      gridRow: "2/6",
      background: "green",
      minHeight: "200px"
    },
    {
      id: "",
      label: "2",
      gridColumn: "3/6",
      gridRow: "1/6",
      background: "black"

    },
    {
      id: "",
      label: "3",
      gridColumn: "6/12",
      gridRow: "1/6",
      background: "blue"
    },
    {
      id: "",
      label: "3",
      gridColumn: "1/12",
      gridRow: "6/12",
      background: "cyan",
      minHeight: "300px"
    },
    {
      id: "",
      label: "3",
      gridColumn: "1 / 10",
      gridRow: "13 / 15",
      background: "yellow",
      minHeight: "600px"
    },
    {
      id: "",
      label: "3",
      gridColumn: "10 / 12",
      gridRow: "13 / 14",
      background: "gray",
      minHeight: "250px"
    },
    {
      id: "",
      label: "3",
      gridColumn: "10 / 12",
      gridRow: "14 / 15",
      background: "pink",
      minHeight: "250px"
    },

  ]

  public metada: SeccionesData | null = null
  @BlockUI('dashboard-full') blockUI: NgBlockUI | undefined;
  dashboardId: number | null = null;
  public templateBlockModalUiComponent: BlockComponent = BlockComponent;
  constructor(
    private _dashboardService: DashboardService,
    private  authService: AuthService,
    private route: ActivatedRoute,
    private _localStorageService:LocalStorageService
    )
 {

  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.dashboardId = +params.get('dashboardId');
      // Aquí puedes agregar lógica para obtener los detalles del dashboard usando el ID
      console.log(`this.dashboardId`, this.dashboardId)
      this._getViewByDashboardData(this.dashboardId)
    });


    
    
        
  }

  onFiltersWithChecks(data: any) {
    console.log(`onFiltersWithChecks`, data)
  }

  onSearchFiltersWithChecks(data: any) {
    console.log(`onSearchFiltersWithChecks`, data)
  }

  onChangeTipoVista(idTipoVista: number) {
    this._getDashboardData(idTipoVista)
  }

  

  private _getViewByDashboardData(idDashboard: number) {
    try {
      this.blockUI?.start()
      this._dashboardService.getSpartan_ViewByDashboard(idDashboard).pipe(take(1)).subscribe((data) => {
        this.blockUI?.stop()        
        // console.log(`_getViewByDashboardData - data`, data)
        let view = data.Spartan_Views[0]?.View_Id || 1
        this._dashboardService.viewId = view
        this._getDashboardData(idDashboard, view)
      }, err => {
        this.blockUI?.stop()
        console.log(`err`, err)
      }) 
    } catch (error) {
      this.blockUI?.stop()
       console.log(`error`)
    }    
  }
  

  private _getDashboardData(idDashboard: number, idView: number = 1) {
    try {
      this.blockUI?.start()
      this._dashboardService.getSectionDashboard(idDashboard, idView).pipe(take(1)).subscribe((data) => {
        this.blockUI?.stop()
        this.metada = data        

        console.log(this.metada);
      }, err => {
        this.blockUI?.stop()
        console.log(`err`, err)
      }) 
    } catch (error) {
      this.blockUI?.stop()
       console.log(`error`)
    }    
  }



}
