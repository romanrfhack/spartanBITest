import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiService {
  readonly BASE_URI =''

  


  constructor(private _http: HttpClient) { }

  public getSectionDashboard(): Observable<any> {
    return this._http.get('./assets/header-metada.json')
  }

}
