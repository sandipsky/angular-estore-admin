import { Injectable } from '@angular/core';
import { UserList } from '../../data/UserList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userList: any[] = UserList.filter(user => user.role !== 'customer');

    constructor() { }

    getUserList(): Observable<any> {
        return of(this.userList);
    }

    addUser(user: any) {
        user.role = 'admin';
        this.userList.push(user);
    }

    updateUser(user: any) {
        user.role = 'admin';
        let index = this.userList.findIndex(data => data.id == user.id);
        this.userList[index] = user;
    }

    deleteUser(user: any) {
        this.userList = this.userList.filter(data => data.id != user.id);
    }
}
