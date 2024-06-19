import { LoginModule } from './auth/login/login.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module')
      .then( m => m.AuthModule )
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then( m => m.DashboardModule ),
  },

  // {
  //   path: 'components',
  //   loadChildren: () => import('.')
  //     .then( m => m.AuthModule ),
  // },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
