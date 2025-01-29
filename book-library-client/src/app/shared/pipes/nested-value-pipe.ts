import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedValue',
})
export class NestedValuePipe implements PipeTransform {
  transform(obj: any, path: string): any {
    if (!path || path === '') {
      return obj;
    }
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      if (value === null || value === undefined) {
        return null;
      }
      value = value[key];
    }
    return value;
  }
}
