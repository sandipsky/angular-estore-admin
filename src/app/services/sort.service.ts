import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SortService {

    constructor() { }

    sortList(data: any, active: any, direction: any) {
        return data.sort((a: any, b: any) => {
            const valueA =
                typeof a[active] === 'string' ? a[active].toLowerCase() : a[active];
            const valueB =
                typeof b[active] === 'string' ? b[active].toLowerCase() : b[active];

            if (typeof a[active] === 'number' && typeof b[active] === 'number') {
                if (direction === 'asc') {
                    return a[active] - b[active];
                } else {
                    return b[active] - a[active];
                }
            } else {
                // Handle string comparison
                if (direction === 'asc') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueB.localeCompare(valueA);
                }
            }
        });
    }
}


