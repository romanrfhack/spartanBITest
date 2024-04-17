import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/app/environments/environment";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "./local-storage.service";
import { CONSTANTS } from "../shared/constants/constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = environment.authApi;
    private oauthRoute: string = 'oauth/token';

    constructor(
        private readonly http: HttpClient,
        private readonly toastrService: ToastrService,
        private readonly localStorageService: LocalStorageService,
    ) {}

    getAuthorization(params : any): Observable<string> {

        const body = new HttpParams()
            .set('username', params.usuario)
            .set('password', params.password)
            .set('grant_type', params.grant_type);
        
        return this.http.post<Observable<string>>(`${ this.apiUrl }/${ this.oauthRoute }`, 
            body.toString(),
            {
                headers: new HttpHeaders()
                  .set('Content-Type', 'application/x-www-form-urlencoded')
            }
        ).pipe(
            map(( response: any ) => {

                console.log( response )
                if (!response.access_token ) {

                    this.toastrService.info('No se ha podido validar su identificación, vuelve a intentarlo');
                    return;
                }

                this.localStorageService.saveData( CONSTANTS.ACCESS_TOKEN , JSON.stringify(response) );
                return response.access_token; 
            }),
        );
    }
}