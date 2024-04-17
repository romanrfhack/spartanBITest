import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'GetItemOfArray'
})
export class GetItemOfArrayPipe implements PipeTransform {

    transform(values: any, key: string): any {
        if (key) {
            const item = values.find((item: any) => item[key] == true)
            return item.value ?? ''
        }
        return ''
    }
}