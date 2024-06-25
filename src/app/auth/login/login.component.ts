import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BlockComponent } from 'src/app/shared/ui/components/block/block.component';
import { DashboardService } from 'src/app/services/dashboard.service';

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
    private _dashboardService: DashboardService,    
    private _router:Router
    ){
    this.form = new FormGroup({
      usuario: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      grant_type : new FormControl('password'),
    });
  }

  private _initFormGroup(){
    
  }

  onLogin(){
    this.blockUI?.start()
    console.log("onLogin",this.form.getRawValue())
    this.authService.getAuthorization(this.form.getRawValue()).subscribe((_) => {
      console.log("getAuthorization",_)
      this.blockUI?.stop()
      //this._router.navigate(['/dashboard'])
      let usuario = this.form.get('usuario')?.value
      this._getSpartan_UserRoleByUsername(usuario)
    },err=>{
      this.blockUI?.stop()
    })
  }

  private _getSpartan_UserRoleByUsername(username: string) {
    try {      
      this.blockUI?.start()
      this._dashboardService.getSpartan_UserRoleByUsername(username).pipe(take(1)).subscribe((data) => {
        this.blockUI?.stop()
        // this.metada = data
        console.log(`_getSpartan_UserRoleByUsername - data`, data)        
        const Role = data.Spartan_Users[0]?.Role
        console.log(`Role`, Role)
        if(Role){
          this._getPermissionsDashboardByRole(Role)
        }        
        
      }, err => {
        this.blockUI?.stop()
        console.log(`err`, err)
      }) 
    } catch (error) {
      this.blockUI?.stop()
       console.log(`error`)
    }    
  }

  private _getPermissionsDashboardByRole(role: number) {
    try {      
      this.blockUI?.start()
      this._dashboardService.getPermissionsDashboardByRole(role).pipe(take(1)).subscribe((data) => {
        this.blockUI?.stop()        
        console.log(`getPermissionsDashboardByRole`, data)                            
        this._dashboardService.arrayDashboard = data.Spartan_Dashboard_Permissionss.map((item) => item.Spartan_Dashboard)
        console.log(`this._dashboardService.arrayDashboard`, this._dashboardService.arrayDashboard)
        this._router.navigate(['/dashboard'])   
      }, err => {
        this.blockUI?.stop()
        console.log(`err`, err)
      }) 
    } catch (error) {
      this.blockUI?.stop()
       console.log(`error`)
    }    
  }
}
