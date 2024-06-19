import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];

    if (!searchText) return items;

    return this.searchItems(items, searchText.toLowerCase());
  }

  private searchItems(items: any[], searchText: string): any[] {
    let results: any = [];

    items.forEach(it => {
      if (it.name.toLowerCase().includes(searchText)) {
        results.push(it);
      }
    });
    return results;
  }

}
