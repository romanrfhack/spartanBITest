import { ThemeService } from './../../services/theme.service';
import { Component } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-custom-controls',
  templateUrl: './custom-controls.component.html',
  styleUrls: ['./custom-controls.component.scss']
})


export class CustomControlsComponent {

  public selectedValue: string = '';
  public isActive = false;
  public valueSearch: string =  ''
  public themeActual = 'dark'
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  constructor(private themeService:ThemeService){
  }

  public onClickButton() {
      this.isActive = !this.isActive
  }

  public onChangeValue(value:any){
    this.valueSearch=value
  }

  public changeTheme() {
    const body = document.getElementsByTagName('body');
    if (body[0].classList.contains('dark')) {
        body[0].classList.remove('dark');
        localStorage.removeItem('theme');
        this.themeService.setTheme('default');
        this.themeActual = 'default'
    } else {
        localStorage.setItem('theme', 'dark');
        this.themeService.setTheme('dark');
        body[0].classList.add('dark');
        this.themeActual = 'dark'
    }
}

}
