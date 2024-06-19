import { Injectable } from '@angular/core';
import { OrderList } from '../../data/OrderList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    orderList: any[] = OrderList;

    constructor() { }

    getOrderList(): Observable<any> {
        return of(this.orderList);
    }

    addOrder(order: any) {
        order.role = 'admin';
        this.orderList.push(order);
    }

    updateOrder(order: any) {
        order.role = 'admin';
        let index = this.orderList.findIndex(data => data.id == order.id);
        this.orderList[index] = order;
    }

    deleteOrder(order: any) {
        this.orderList = this.orderList.filter(data => data.id != order.id);
    }
}
