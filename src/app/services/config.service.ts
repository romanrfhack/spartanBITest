import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Config> {
    let config = this.http.get<Config>(this.configUrl);
    console.log('ConfigService => getConfig => config :', config);
    return config;
  }

  getApiEndpoint(): Observable<string> {
    return this.getConfig().pipe(
      map(config => config.api)
    );
  }

  getAuthApi(): Observable<string> {
    return this.getConfig().pipe(
      map(config => config.authApi)
    );
  }

  // Puedes añadir más métodos para otras propiedades si es necesario
}

export interface Config {
  api: string;
  authApi: string;
  version: string;
  secretCrypto: string;
  idDashboardDefault: number;
  idViewDefault: number;
  versionApp: string;
}
