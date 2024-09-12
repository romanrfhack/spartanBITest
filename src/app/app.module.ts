import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockComponent } from './shared/ui/components/block/block.component';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { ConfigService } from './services/config.service';
import { SpartaneAssistantComponent } from './shared/components/spartane-assistant/spartane-assistant.component';


@NgModule({
  declarations: [
    AppComponent,
    BlockComponent,        
    SpartaneAssistantComponent
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
  providers: [    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
