import { ThemeService } from './../../../services/theme.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ENUM_TIPO_DE_COMPONETES } from 'src/app/shared/enums/enums';
import { take } from 'rxjs';
import { Componente, SeccionesData } from 'src/app/models/bi';
import { environment } from 'src/app/environments/environment';
import * as _ from 'lodash';
import { ComponenteModel, SeccionModel, SeccionesDataModel } from 'src/app/models/seccion.data';
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
        // console.log(res);
      },
    });    
    setTimeout(() => {
      this.onSearch();
    }, 2000);
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

  // private _builtSeccionFilters(metadata: SeccionesDataModel) {
  //   const _meta = metadata.secciones.find(
  //     (m: SeccionModel) => m.id == 2 || m.tipo == 'filters'
  //   );
  //   if (_meta) {
  //     this.seccionFilters = _.cloneDeep(_meta);

  //     this.seccionFilters.items.map((e: Componente) => {

  //       let isArr: boolean = false;
  //       let valueSelected: string | number | boolean | string[] | null;
  //       let counValuesSelected: number = 0;

  //       (e.values as Value[]).map((value) => {
  //         if (value.selected) {
  //           counValuesSelected++;
  //         }
  //       });

  //       if (counValuesSelected > 1) {
  //         isArr = true;
  //         valueSelected = [];
  //       }

  //       (e.values as Value[]).map((value) => {
  //         if (value.selected) {
  //           if (isArr) {
  //             (valueSelected as string[]).push(value.value);
  //           } else {
  //             valueSelected = value.value;
  //           }
  //         }
  //       });
  //       this.form.setControl(e.filterName ?? 'null', new FormControl(valueSelected));

  //     });
  //   }
  // }

  private _builtSeccionFilters(metadata: SeccionesDataModel) {
    const _meta = metadata.secciones.find(
      (m: SeccionModel) => m.id == 2 || m.tipo == 'filters'
    );
    if (_meta) {
      this.seccionFilters = _.cloneDeep(_meta);
  
      this.seccionFilters.items.map((e: Componente) => {
        let valueSelected: string | number | boolean | string[] | null = null;
  
        // Aquí, inicializamos el valor seleccionado como null para no tener nada preseleccionado
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

  removeNullProperties(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
  }

  onSearch() {
    console.log(`filtrando...`);
    const obj: object = this.form.value;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {        
        if (Array.isArray(obj[key])) {          
          obj[key] = obj[key].join('|');
        }
      }
    }

    this.blockUI.start();

    const cleanedFormValue = this.removeNullProperties(this.form.value);

    this._dashboardService
      .getSectionBodyDashboard(JSON.stringify(cleanedFormValue))
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

  misDashboards() {
    this._router.navigate(['/dashboard']);
  }
}
