import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { environment } from "src/app/environments/environment";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "./local-storage.service";
import { CONSTANTS } from "../shared/constants/constants";
import { ConfigService } from "./config.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = "";
    private oauthRoute: string = 'oauth/token';

    constructor(
        private readonly http: HttpClient,
        private readonly toastrService: ToastrService,
        private readonly localStorageService: LocalStorageService,
        private configService: ConfigService
    ) {
        // insertar tiempor para esperar la carga de la configuración                            
    }

    

    getAuthorization(params: any): Observable<string> {
        return this.configService.getConfig().pipe(
          switchMap(config => {
            console.log("AuthService: ", config); // Verifica que obtienes el objeto de configuración completo
            this.apiUrl = config.authApi;
    
            const body = new HttpParams()
              .set('username', params.usuario)
              .set('password', params.password)
              .set('grant_type', params.grant_type);
    
            console.log('AuthService => getAuthorization => this.apiUrl:', this.apiUrl);
    
            return this.http.post(`${this.apiUrl}/${this.oauthRoute}`,
              body.toString(),
              {
                headers: new HttpHeaders()
                  .set('Content-Type', 'application/x-www-form-urlencoded')
              }
            ).pipe(
              map((response: any) => {
                console.log(response);
                if (!response.access_token) {
                  this.toastrService.info('No se ha podido validar su identificación, vuelve a intentarlo');
                  throw new Error('No access token');
                }
    
                this.localStorageService.saveData(CONSTANTS.ACCESS_TOKEN, JSON.stringify(response));
                return response.access_token;
              }),
              catchError(error => {
                // Manejo de errores, si es necesario
                this.toastrService.error('Error en la autenticación');
                throw error;
              })
            );
          })
        );
      }
}