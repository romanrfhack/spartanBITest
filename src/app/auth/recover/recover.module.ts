import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoverComponent } from './recover.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RecoverComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: RecoverComponent,
    }]),
  ]
})
export class RecoverModule { }
