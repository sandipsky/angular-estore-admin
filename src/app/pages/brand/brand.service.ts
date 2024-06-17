import { Injectable } from '@angular/core';
import { BrandList } from '../../data/BrandList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BrandService {
    brandList: any[] = BrandList;

    constructor() { }

    getBrandList(): Observable<any> {
        return of(this.brandList);
    }

    addBrand(brand: any) {
        this.brandList.push(brand);
    }

    updateBrand(brand: any) {
        let index = this.brandList.findIndex(data => data.id == brand.id);
        this.brandList[index] = brand;
    }

    deleteBrand(brand: any) {
        this.brandList = this.brandList.filter(data => data.id != brand.id);
    }
}
