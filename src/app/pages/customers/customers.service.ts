import { Injectable } from '@angular/core';
import { UserList } from '../../data/UserList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    customerList: any[] = UserList.filter(customer => customer.role === 'customer');

    constructor() { }

    getCustomerList(): Observable<any> {
        return of(this.customerList);
    }

    addCustomer(customer: any) {
        customer.role = 'admin';
        this.customerList.push(customer);
    }

    updateCustomer(customer: any) {
        customer.role = 'admin';
        let index = this.customerList.findIndex(data => data.id == customer.id);
        this.customerList[index] = customer;
    }

    deleteCustomer(customer: any) {
        this.customerList = this.customerList.filter(data => data.id != customer.id);
    }
}
