import { Injectable } from '@angular/core';
import { camelCase, snakeCase } from 'lodash';
@Injectable({
    providedIn: 'root'
})
export class ApiTranslatorService {
    modelToSnakeCase(model : any) {
        const apiModel : any = {};
        if (model) {
            for (const key of Object.keys(model)) {
                if (!!model[key] && typeof model[key] === 'object' && !(model[key] instanceof Date)) {
                    apiModel[snakeCase(key)] = this.modelToSnakeCase(model[key]);
                } else if (!!model[key] && model[key] instanceof Array) {
                    apiModel[snakeCase(key)] = model[key].map((value : any) => this.modelToSnakeCase(value));
                } else {
                    apiModel[snakeCase(key)] = model[key];
                }
            }
        }
        return apiModel;
    }
    modelToCamelCase(apiModel : any) {
        if (!apiModel) { return; }
        const modelData : any = {};
        for (const key of Object.keys(apiModel)) {
            if (apiModel[key] === null && apiModel[key] === undefined) {
                return;
            }
            if (Array.isArray(apiModel[key])) {
                const array = [];
                for (const item of apiModel[key]) {
                    switch (typeof item) {
                        case 'string':
                            array.push(camelCase(item));
                            break;
                        case 'number':
                            array.push(item);
                            break;
                        default:
                            array.push(this.modelToCamelCase(item));
                    }
                }
                modelData[camelCase(key)] = array;
            } else {
                modelData[camelCase(key)] = (typeof (apiModel[key]) === 'object')
                    ? this.modelToCamelCase(apiModel[key])
                    : apiModel[key];
            }
        }
        return modelData;
    }
}