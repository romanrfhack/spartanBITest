import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockComponent } from 'src/app/shared/ui/components/block/block.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @BlockUI('login-full') blockUI: NgBlockUI | undefined;
  public templateBlockModalUiComponent: BlockComponent = BlockComponent;
  public form: FormGroup<any>;
  constructor (
    private authService:AuthService,
    private _router:Router
    ){
    this.form = new FormGroup({
      usuario: new FormControl('demo',Validators.required),
      password: new FormControl('demo',Validators.required),
      grant_type : new FormControl('password'),
    });
  }

  private _initFormGroup(){
    
  }

  onLogin(){
    this.blockUI?.start()
    this.authService.getAuthorization(this.form.getRawValue()).subscribe((_) => {
      console.log(_)
      this.blockUI?.stop()
      this._router.navigate(['/dashboard'])
    },err=>{
      this.blockUI?.stop()
    })
  }
}
