import { Pipe, PipeTransform } from '@angular/core';
import { DataModel } from '../services/http.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: DataModel[], filterString: string, propsName: string): any {
    const result: DataModel[] = [];

    if (
      !value ||
      value.length === 0 ||
      filterString === '' ||
      !filterString ||
      propsName === ''
    ) {
      return value;
    }

    value.forEach((val) => {
      if (
        val[propsName]
          .trim()
          .toLowerCase()
          .includes(filterString.trim().toLowerCase())
      )
        result.push(val);
    });
    return result;
  }
}
