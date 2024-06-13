import { Injectable } from '@angular/core';
import { CategoryList } from '../../data/CategoryList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categoryList: any[] = CategoryList;


    constructor() { }

    getCategoryList(): Observable<any> {
        return of(this.categoryList);
    }

    addCategory(category: any) {
        this.categoryList.push(category);
    }

    updateCategory(category: any) {
        let index = this.categoryList.findIndex(data => data.id == category.id);
        this.categoryList[index] = category;
    }

    deleteCategory(category: any) {
        this.categoryList = this.categoryList.filter(data => data.id != category.id);
    }
}
