
import { ApiTranslatorService } from './api-translator-service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { SeccionesData } from '../models/bi';
import { SeccionesDataModel } from '../models/seccion.data';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  metaDataGeneral$: BehaviorSubject<SeccionesDataModel> = new BehaviorSubject<SeccionesDataModel>({});
  metaDataBody$: BehaviorSubject<SeccionesDataModel> = new BehaviorSubject<SeccionesDataModel>({});


  // public message$: BehaviorSubject<string> = new BehaviorSubject('');
  // public anyMessage$: BehaviorSubject<any> = new BehaviorSubject({});
  readonly BASE_URL = environment.api
  readonly idDashboard = environment.idDashboardDefault
  private viewId = environment.idDashboardDefault
  constructor(
    private _http: HttpClient,
    private _apiTranslatorService: ApiTranslatorService
  ) { }


  public getSectionDashboard(tipoVista: number): Observable<SeccionesDataModel> {

    this.viewId = tipoVista ==  environment.idDashboardDefault ? this.viewId : tipoVista
    const params = {
      dashboardId: this.idDashboard,
      viewId: tipoVista
    }
    // return this._http.get<SeccionesDataModel>(`${this.BASE_URL}Spartan_Dashboard/Spartan_DashboardConfiguration`, {
    //   params: new HttpParams({ fromObject: params })
    // }).pipe(
    //   map((data) => {
    //     const seccionesData = new SeccionesDataModel(data)
    //     this.metaDataGeneral$.next(seccionesData)
    //     return seccionesData
    //   }),catchError(this.handlerError.bind(this))
    // )
    

    let json = 'vista-general-metadata.json'
    if (tipoVista == 2) {
      json = 'vista-por-municipio-metadata.json'
    }
    if (tipoVista == 3) {
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

    JSON.stringify({ ...queryParams })
    const baseParams = {
      dashboardId: this.idDashboard,
      viewId: this.viewId,
      params: JSON.stringify({ ...queryParams })
    }
    return this._http.get<SeccionesDataModel>(`${this.BASE_URL}Spartan_Dashboard/Spartan_DashboardFilter`, {
      params: new HttpParams({ fromObject: baseParams })
    }).pipe(
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

}
