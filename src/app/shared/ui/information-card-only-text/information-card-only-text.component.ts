
import { Component, Input } from '@angular/core';
import { ENUM_TIPO_DE_COMPONETES } from '../../enums/enums';
import { Componente } from 'src/app/models/bi';

@Component({
  selector: 'app-information-card-only-text',
  templateUrl: './information-card-only-text.component.html',
  styleUrls: ['./information-card-only-text.component.scss']
})
export class InformationCardOnlyTextComponent {
  public dataComponente: any
  @Input()
  set metadataComponente(metadata: any) {
    if (!metadata) {
      return
    }
    this._setDataComponente(metadata)
  }
  constructor() { }


  private _setDataComponente(metadata: Componente) {
    setTimeout(() => {
      this.dataComponente = metadata
      console.log("_setDataComponente",this.dataComponente)
    }, 0)
  }
}