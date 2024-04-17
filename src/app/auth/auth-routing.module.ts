import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./login/login.module')
      .then( m => m.LoginModule ),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module')
      .then( m => m.RegisterModule ),
  },
  {
    path: 'recover',
    loadChildren: () => import('./recover/recover.module')
      .then( m => m.RecoverModule ),
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module')
      .then( m => m.NewPasswordModule ),
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
