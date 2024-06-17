import { Injectable } from '@angular/core';
import { ProductList } from '../../data/ProductList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    productList: any[] = ProductList;

    constructor() { }

    getProductList(): Observable<any> {
        return of(this.productList);
    }

    addProduct(product: any) {
        this.productList.push(product);
    }

    updateProduct(product: any) {
        let index = this.productList.findIndex(data => data.id == product.id);
        this.productList[index] = product;
    }

    deleteProduct(product: any) {
        this.productList = this.productList.filter(data => data.id != product.id);
    }
}
