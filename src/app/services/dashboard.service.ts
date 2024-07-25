
import { ApiTranslatorService } from './api-translator-service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { SeccionesData } from '../models/bi';
import { SeccionesDataModel } from '../models/seccion.data';
import { DashboardPermissionsResponse, SpartanDashboard, SpartanDashboardsResponse, SpartanViewsResponse } from '../models/dashboard.data';
import { SpartanUsersResponse } from '../models/spartanUserRole';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  metaDataGeneral$: BehaviorSubject<SeccionesDataModel> = new BehaviorSubject<SeccionesDataModel>({});
  metaDataBody$: BehaviorSubject<SeccionesDataModel> = new BehaviorSubject<SeccionesDataModel>({});  
  arrayDashboard: number[] = []
  dashboards: SpartanDashboard[] | null = null;


  // public message$: BehaviorSubject<string> = new BehaviorSubject('');
  // public anyMessage$: BehaviorSubject<any> = new BehaviorSubject({});
  BASE_URL:string = "";
  idDashboard:number = environment.idDashboardDefault
  viewId:number = environment.idDashboardDefault
  constructor(
    private _http: HttpClient,
    private configService: ConfigService,
    private _apiTranslatorService: ApiTranslatorService
    ) {    
      this.configService.getConfig().subscribe((config) => {
        this.BASE_URL = config.api            
      }
    )
  }  

  public getSectionDashboard(idDashboard: number, viewId:number = 1): Observable<SeccionesDataModel> {
    // this.viewId = idDashboard ==  environment.idDashboardDefault ? this.viewId : idDashboard
    // this.viewId = 1
    const params = {
      dashboardId: this.idDashboard,  
      viewId: this.viewId,
    }    
    return this._http.get<SeccionesDataModel>(`${this.BASE_URL}/Spartan_Dashboard/Spartan_DashboardConfiguration`, {
      params: new HttpParams({ fromObject: params })
    }).pipe(
      map((data) => {
        const seccionesData = new SeccionesDataModel(data)
        this.metaDataGeneral$.next(seccionesData)
        return seccionesData
      }),catchError(this.handlerError.bind(this))
    )

        
    let json = 'vista-general-metadata.json'
    if (idDashboard == 2) {
      json = 'vista-por-municipio-metadata.json'
    }
    if (idDashboard == 3) {
      json = 'vista-general-metadata-unidad.json'
    }
    return this._http.get<SeccionesDataModel>(`./assets/${json}`).pipe(
      map((data) => {
            const seccionesData = new SeccionesDataModel(data)
            this.metaDataGeneral$.next(seccionesData)
            return seccionesData
          }),catchError(this.handlerError.bind(this))
        )
  }

  public getSectionBodyDashboard(queryParams: any): Observable<SeccionesDataModel> {
    const baseParams = {
      dashboardId: this.idDashboard,  
      viewId: this.viewId,
      spParams: queryParams
    }    
    return this._http.post<SeccionesDataModel>(`${this.BASE_URL}/Spartan_Dashboard/Spartan_DashboardFilter`, baseParams).pipe(
      tap((data) => {
        const seccionesData = new SeccionesDataModel(data)
        this.metaDataBody$.next(seccionesData)
      })
    )
  }

  handlerError(error: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = error?.error?.message ? error.error.message : 'Ha ocurrido un error, intente más tarde';
    console.log(error);
    return throwError(errorMessage);
  }
  
  public getSpartan_Dashboard(dashboars: string): Observable<SpartanDashboardsResponse> {    
    const baseParams = {
      startRowIndex: 0,
      maximumRows: 10,
      where: "Dashboard_Id in ("+dashboars+")"
    }    
    return this._http.get<SpartanDashboardsResponse>(`${this.BASE_URL}/Spartan_Dashboard/ListaSelAll`, {
      params: new HttpParams({ fromObject: baseParams })
    })
  }

  public getSpartan_UserRoleByUsername(username: string): Observable<SpartanUsersResponse> {    
    const baseParams = {
      startRowIndex: 0,
      maximumRows: 10,
      where: "Username='" + username + "'"
    }        
    console.log("getSpartan_UserRoleByUse => BASE_URL", this.BASE_URL)
    return this._http.get<SpartanUsersResponse>(`${this.BASE_URL}/Spartan_User/ListaSelAll`, {
      params: new HttpParams({ fromObject: baseParams })
    })
  }

  
  public getPermissionsDashboardByRole(role: number): Observable<DashboardPermissionsResponse> {    
    const baseParams = {
      startRowIndex: 0,
      maximumRows: 10,
      where: "Allowed_Role=" + role
    }
    return this._http.get<DashboardPermissionsResponse>(`${this.BASE_URL}/Spartan_Dashboard_Permissions/ListaSelAll`, {
      params: new HttpParams({ fromObject: baseParams })
    })
  }

  public getSpartan_ViewByDashboard(dashboars: number): Observable<SpartanViewsResponse> {    
    const baseParams = {
      startRowIndex: 0,
      maximumRows: 10,
      where: "Tablero = "+dashboars
    }    
    return this._http.get<SpartanViewsResponse>(`${this.BASE_URL}/Spartan_View/ListaSelAll`, {
      params: new HttpParams({ fromObject: baseParams })
    })
  }

}
