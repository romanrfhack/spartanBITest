import { ThemeService } from './../../../services/theme.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { take } from 'rxjs';
import { Componente, SeccionesData } from 'src/app/models/bi';
import { environment } from 'src/app/environments/environment';
import * as _ from 'lodash';
import {
  ComponenteModel,
  SeccionModel,
  SeccionesDataModel,
} from 'src/app/models/seccion.data';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Value } from './interfaces/DTO.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @BlockUI('dashboard-full') blockUI: NgBlockUI | undefined;
  @Input()
  set metadataInput(metadata: any) {
    if (!metadata) {
      return;
    }

    this._builtSeccionVista(metadata);
    this._builtSeccionFilters(metadata);

    this.metadata = metadata;
  }

  public metadata: any = null;

  @Output() onChangeTipoVista: EventEmitter<number> = new EventEmitter();
  seccion: SeccionModel | undefined;
  selectedItem: number = 0;
  seccionFilters: SeccionModel;
  queryParams: any;
  themeActual = 'default';

  public form: FormGroup;

  constructor(
    private _dashboardService: DashboardService,
    private themeService: ThemeService,
    private _router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  private _builtSeccionVista(metadata: SeccionesDataModel) {
    const _meta: SeccionModel | undefined = metadata.secciones?.find(
      (m: SeccionModel) => m.id == 1 || m.tipo == 'view'
    );
    if (_meta) {
      this.seccion = _meta;
      this._getItemDefaultSelected();
    }
  }

  private _builtSeccionFilters(metadata: SeccionesDataModel) {
    const _meta = metadata.secciones.find(
      (m: SeccionModel) => m.id == 2 || m.tipo == 'filters'
    );
    if (_meta) {
      this.seccionFilters = _.cloneDeep(_meta);

      this.seccionFilters.items.map((e: Componente) => {

        let isArr: boolean = false;
        let valueSelected: string | number | boolean | string[] | null;
        let counValuesSelected: number = 0;

        (e.values as Value[]).map((value) => {
          if (value.selected) {
            counValuesSelected++;
          }
        });

        if (counValuesSelected > 1) {
          isArr = true;
          valueSelected = [];
        }

        (e.values as Value[]).map((value) => {
          if (value.selected) {
            if (isArr) {
              (valueSelected as string[]).push(value.value);
            } else {
              valueSelected = value.value;
            }
          }
        });

        this.form.setControl(e.filterName ?? 'null', new FormControl(valueSelected));
      });
    }
  }

  private _getItemDefaultSelected() {
    this.seccion!.items.forEach((componente: Componente) => {
      componente.defaultValueInValues = componente.values.find(
        (item: any) => item.selected
      );
      if (componente.defaultValueInValues) {
        this.selectedItem = componente.defaultValueInValues.id;
      }
    });
  }

  onSelectTipoVista(id: any) {
    this.selectedItem = id;
    this.onChangeTipoVista.emit(this.selectedItem);
  }

  onSearch() {
    const obj: object = this.form.value;

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Verificamos si la propiedad es un arreglo
        if (Array.isArray(obj[key])) {
          // Convertimos el arreglo a un string, separando los elementos con comas
          obj[key] = obj[key].join(',');
        }
      }
    }
    
    this.blockUI.start();
    
    this._dashboardService
      .getSectionBodyDashboard(JSON.stringify(this.form.value))
      .pipe(take(1))
      .subscribe(
        (data: SeccionesData) => {
          this.blockUI.stop();
        },
        (err) => {
          this.blockUI.stop();
          console.log(`err`, err);
        }
      );
  }

  // onChangeTabGroup($event: any, filter: ComponenteModel) {
  //   console.log(`onChangeTabGroup => $event`, $event)
  //   console.log(`onChangeTabGroup => filter`, filter)
  //   this.queryParams = { ...this.queryParams, [filter.filterName]: $event.value }
  //   console.log(`this.queryParams`, this.queryParams)
  // }

  // onSelectChange($event: any, filter: ComponenteModel) {
  //   console.log(`onSelectChange => $event`, $event)
  //   console.log(`onSelectChange => filter`, filter)
  //   this._checkSelectAll($event, filter)
  //   this.queryParams = { ...this.queryParams, [filter.filterName]: $event.value.join() }
  //   console.log(`onSelectChange`, this.queryParams)
  // }

  // onCheckBoxChange($event: any, filter: any) {
  //   console.log(`onCheckBoxChange => $event`, $event)
  //   console.log(`onCheckBoxChange => filter`, filter)
  //   this.queryParams = { ...this.queryParams, [filter.filterName]: $event.checked }
  //   console.log(`onCheckBoxChange`, this.queryParams)
  // }

  onLimpiarFiltros() {
    this.blockUI.start();
    this.queryParams = {};
    this.form.reset();
    this._onClearFilters();
    const idViewDefault = environment.idViewDefault;
    this._dashboardService
      .getSectionDashboard(idViewDefault)
      .pipe(take(1))
      .subscribe(
        (data: SeccionesData) => {
          this.blockUI.stop();
        },
        (err) => this.blockUI.stop()
      );
  }

  onChangeTheme() {
    const body = document.getElementsByTagName('body');
    if (body[0].classList.contains('dark')) {
      body[0].classList.remove('dark');
      localStorage.removeItem('theme');
      this.themeService.setTheme('default');
      this.themeActual = 'default';
    } else {
      localStorage.setItem('theme', 'dark');
      this.themeService.setTheme('dark');
      body[0].classList.add('dark');
      this.themeActual = 'dark';
    }
  }

  private _onClearFilters() {
    let seccionFilter = _.cloneDeep(this.seccionFilters);
    if (seccionFilter && this.seccionFilters) {
      seccionFilter.items.forEach((item: ComponenteModel) => {
        const orignalValues = this.seccionFilters!.items.find(
          (itemOriginal: ComponenteModel) => itemOriginal.id == item.id
        );
        const defaultValue = orignalValues!.values.find(
          (item: any) => item.selected
        );
        if (defaultValue) {
          item.values.find((item: any) => item.id == defaultValue.id).selected =
            defaultValue.selected;
        }
      });
      this.seccionFilters = { ...this.seccionFilters, ...seccionFilter };
    }
  }

  public get ENUM_TIPO_DE_COMPONETES(): typeof ENUM_TIPO_DE_COMPONETES {
    return ENUM_TIPO_DE_COMPONETES;
  }

  // private _checkSelectAll(itemSelected, filter: ComponenteModel) {
  //   console.log(`itemSelected`, itemSelected)
  //   if (filter.nombreComponente == ENUM_TIPO_DE_COMPONETES.MULTI_SELECT) {
  //     if (itemSelected.value[0] == null) {
  //       for (const item of filter.values) {
  //         item.selected = true
  //       }
  //       const indexComponente = this.seccionFilters.items.findIndex((c:Componente) =>  c.filterName == filter.filterName)
  //       if(indexComponente != -1){
  //         this.seccionFilters.items[indexComponente].values= filter.values
  //       }
  //       console.log(this.seccionFilters)
  //     } else {
  //       //filter.values = filter.values.filter((item:any) => item.id != n)
  //     }
  //   }

  // }

  misDashboards() {
    this._router.navigate(['/dashboard']);
  }
}
