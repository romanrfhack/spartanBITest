import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getItemsOfArray'
})
export class GetItemsOfArrayPipe implements PipeTransform {

  transform(values: any, key: string): any {
    if (key) {
        const items = values.filter((item: any) => item[key] == true)
        return items ? items.map((item) => {return item.id ? item.id.toString() :  '0'}) : []
    }
    return []
}
}
