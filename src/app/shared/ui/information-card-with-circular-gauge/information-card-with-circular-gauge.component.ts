import { Component, Input } from '@angular/core';
import { Componente } from 'src/app/models/bi';
import { CIRCULAR_GAUGE } from './mock';

@Component({
  selector: 'app-information-card-with-circular-gauge',
  templateUrl: './information-card-with-circular-gauge.component.html',
  styleUrls: ['./information-card-with-circular-gauge.component.scss']
})
export class InformationCardWithCircularGaugeComponent {
  public value = 50;
  public dataComponete: Componente | null = CIRCULAR_GAUGE
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
      this.dataComponete = metadata
    }, 0)
  }
}
