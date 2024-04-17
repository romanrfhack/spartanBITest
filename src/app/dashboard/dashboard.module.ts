import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { BIComponent } from './bi/bi.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { UiSpartanBiModule } from '../shared/ui/ui-spartan-bi/ui-spartan-bi.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockComponent } from '../shared/ui/components/block/block.component';
import { authGuard } from '../auth.guard';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '', component: BIComponent, 
        canActivate: [authGuard]        
      },
      // {
      //   path: 'page-not-found',
      //   loadChildren: () => import('./page404/page404.module')
      //     .then( m => m.Page404Module ),
      // },
      {
        path: '**',
        redirectTo: 'page-not-found',
      }
    ],
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    BIComponent,
    
  ],

  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
    LayoutModule,
    ChartsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      template: BlockComponent,
    }),
    UiSpartanBiModule
  ]
})
export class DashboardModule { }
