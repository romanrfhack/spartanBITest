import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, of, takeUntil } from 'rxjs';
import * as _ from 'lodash';
import { Componente } from 'src/app/models/bi';
@Component({
  selector: 'app-filters-with-checks',
  templateUrl: './filters-with-checks.component.html',
  styleUrls: ['./filters-with-checks.component.scss']
})
export class FiltersWithChecksComponent {

  @Input()
  set metadataComponente(metadata: any) {
    if (!metadata) {
      return
    }
    this._builtListChecks(metadata)
  }
  @Output() checksEmit = new EventEmitter<Array<string>>()
  @Output() searchInputEmit = new EventEmitter<Array<string>>()
  public controlMetadata: any;
  public controlsChecked: any;
  public selectedAll: boolean = false
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    // metadata   
  ) {
  }

  public onChecked(value: any, item: any) {
    this.selectedAll = false
    this.controlsChecked.values.find((t: any) => t.id == item.id).checked = value
    const checks = this.controlsChecked.values.filter((item: any) => item.checked).map((item: any) => item.id)
    this.checksEmit.emit(checks)
  }

  public setAll(all: boolean) {
    this.selectedAll = all
    this.controlsChecked.values.forEach((t: any) => (t.checked = all));
    if (all) {
      this.checksEmit.emit(['all'])
    }
  }

  public onChangeSearchInput($event: any) {
    this.searchInputEmit.emit($event)
    of($event).pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged(),
      debounceTime(500)
    ).subscribe((searchTerm: any) => {
      if (searchTerm) {
        this.controlsChecked.values = this.controlMetadata.values.filter((item: any) => item.label.toString().replace(/ /g, '').toLowerCase().includes(searchTerm.replace(/ /g, '').toLowerCase()))
        return
      }
      this.controlsChecked.values = _.cloneDeep(this.controlMetadata.values)
    })
  }

  private _builtListChecks(metadata: Componente): void {
    setTimeout(() => {
        this.controlMetadata = metadata
        this.controlsChecked = _.cloneDeep(this.controlMetadata);
    }, 0)
  }
}
