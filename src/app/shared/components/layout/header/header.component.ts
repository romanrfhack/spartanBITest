import { ThemeService } from './../../../services/theme.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { take, map } from 'rxjs';
import { Componente, SeccionesData } from 'src/app/models/bi';
import { environment } from 'src/app/environments/environment';
import * as _ from 'lodash';
import { ComponenteModel, SeccionModel, SeccionesDataModel } from 'src/app/models/seccion.data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input()
  set metadataInput(metadata: any) {
    if (!metadata) {
      return
    }
    this._builtSeccionVista(metadata)
    this._builtSeccionFilters(metadata)
  }

  @Output() onChangeTipoVista: EventEmitter<number> = new EventEmitter()
  seccion: SeccionModel | undefined;
  selectedItem: number = 0;
  seccionFilters: SeccionModel | undefined;
  queryParams: any;
  themeActual = 'default'
  constructor(
    private _dashboardService: DashboardService,
    private themeService: ThemeService
  ) {

  }

  private _builtSeccionVista(metadata: SeccionesDataModel) {
    const _meta: SeccionModel | undefined = metadata.secciones?.find((m: SeccionModel) => m.id == 1 || m.tipo == "view")
    if (_meta) {
      this.seccion = _meta
      this._getItemDefaultSelected()
    }
  }

  private _builtSeccionFilters(metadata: SeccionesDataModel) {
    const _meta = metadata.secciones.find((m: SeccionModel) => m.id == 2 || m.tipo == "filters")
    if (_meta) {
      this.seccionFilters = _.cloneDeep(_meta);

    }
  }

  private _getItemDefaultSelected() {
    this.seccion!.items.forEach((componente: Componente) => {
      componente.defaultValueInValues = componente.values.find((item: any) => item.selected)
      if (componente.defaultValueInValues) {
        this.selectedItem = componente.defaultValueInValues.id
      }
    })

    console.log(this.seccion)
  }

  onSelectTipoVista(id: any) {
    console.log(id)
    this.selectedItem = id
    this.onChangeTipoVista.emit(this.selectedItem)
  }

  onSearch() {
    this._dashboardService.getSectionBodyDashboard(this.queryParams).pipe(take(1)).subscribe((data: SeccionesData) => {
    })
  }

  onChangeTabGroup($event: any, filter: any) {
    this.queryParams = { ...this.queryParams, [filter.value]: $event.value }
  }

  onSelectChange($event: any, filter: any) {
    this.queryParams = { ...this.queryParams, [filter.value]: $event.value }
  }

  onCheckBoxChange($event: any, filter: any) {
    this.queryParams = { ...this.queryParams, [filter.value]: $event.checked }
  }

  onLimpiarFiltros() {
    this.queryParams = {}
    this._onClearFilters()
    const idViewDefault = environment.idViewDefault
    this._dashboardService.getSectionDashboard(idViewDefault).pipe(take(1)).subscribe((data: SeccionesData) => {
    })
  }

  onChangeTheme() {
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

  private _onClearFilters() {
    let seccionFilter = _.cloneDeep(this.seccionFilters)
    if (seccionFilter && this.seccionFilters) {
      seccionFilter.items.forEach((item: ComponenteModel) => {
        const orignalValues = this.seccionFilters!.items.find((itemOriginal: ComponenteModel) => itemOriginal.id == item.id)
        const defaultValue = orignalValues!.values.find((item: any) => item.selected)
        if (defaultValue) {
          item.values.find((item: any) => item.id == defaultValue.id).selected = defaultValue.selected
        }
      })
      this.seccionFilters = { ...this.seccionFilters, ...seccionFilter }
    }


  }

  public get ENUM_TIPO_DE_COMPONETES(): typeof ENUM_TIPO_DE_COMPONETES {
    return ENUM_TIPO_DE_COMPONETES;
  }

}
