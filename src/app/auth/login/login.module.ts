import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSpartanBiModule } from 'src/app/shared/ui/ui-spartan-bi/ui-spartan-bi.module';
import { BlockUIModule } from 'ng-block-ui';
import { BlockComponent } from 'src/app/shared/ui/components/block/block.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild([{
      path: '', component: LoginComponent,
    }]),
    UiSpartanBiModule,
    BlockUIModule.forRoot({
      template: BlockComponent,
    }),
  ]
})
export class LoginModule { }
