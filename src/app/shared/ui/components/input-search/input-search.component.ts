import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
   @Input() placeHolder = 'Buscar . . .'
   @Output() onSearch: EventEmitter<string> = new EventEmitter();
   search:string =''
  constructor(){

  }

  onChangeValue($event:any){
    this.onSearch.emit($event)
  }
}
