import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userFilter' })
export class UserFilterPipe implements PipeTransform {
  transform(list: any[], value: string) {
    return value ? list.filter((item) => item.gender === value) : list;
  }
}
