import { inject } from '@angular/core';
import { CanActivateFn, Route, Router, UrlTree } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { CONSTANTS } from './shared/constants/constants';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): any => {
  const token = inject(LocalStorageService).getData(CONSTANTS.ACCESS_TOKEN)
  if (token && token.length > 0) {
    console.log(`sesion activa`)
    return true
  } else {
    console.log(`no se ha encontrado el token `)
    inject(Router).createUrlTree(['/']);
  }

};
