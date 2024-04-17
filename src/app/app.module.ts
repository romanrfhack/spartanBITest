import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BlockComponent } from './shared/ui/components/block/block.component';
import { BlockUI, NgBlockUI, BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    BlockUIModule.forRoot({
      template: BlockComponent,
    }),
    
  ],
  bootstrap: [AppComponent],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true,
    },
],
})
export class AppModule { }
