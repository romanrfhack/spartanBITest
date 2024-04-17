import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, ObservableInput, throwError } from "rxjs";
import { environment } from "../environments/environment";
import { LocalStorageService } from "../services/local-storage.service";
import { CONSTANTS } from "../shared/constants/constants";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    readonly environment = environment;
    constructor(
        private _router: Router,
        private readonly localStorageService: LocalStorageService,
        private readonly _authService: AuthService

    ) { }
    /**Intercept http request
     * <and response
     * @param req request
     * @param next nest state
     */
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const omitirUrls = [
            'oauth/token'
        ];
        if (!omitirUrls.find(x => req.url.includes(x))) {
            console.log(this.localStorageService.getData(CONSTANTS.ACCESS_TOKEN))
            const tokenData = this.localStorageService.getData(CONSTANTS.ACCESS_TOKEN) ? JSON.parse(this.localStorageService.getData(CONSTANTS.ACCESS_TOKEN)) : null
            if (tokenData) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
        }
        return next.handle(req).pipe(
            catchError(
                (error: any): ObservableInput<any> => {
                    if (error.status === 401) {
                        this._router.navigateByUrl('/')
                    }
                    return throwError(error);
                }
            )
        );
    }
}