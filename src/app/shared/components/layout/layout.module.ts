import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { CustomControlsComponent } from '../../ui/custom-controls/custom-controls.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';
import { UiSpartanBiModule } from '../../ui/ui-spartan-bi/ui-spartan-bi.module';
import { FiltersWithChecksComponent } from '../../ui/components/filters-with-checks/filters-with-checks.component';
import { SpinnerComponent } from '../../ui/components/spinner/spinner.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    CustomControlsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    UiSpartanBiModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    CustomControlsComponent,
    FiltersWithChecksComponent,
    SpinnerComponent
  ],
  providers:[
  ]
})
export class LayoutModule { }
