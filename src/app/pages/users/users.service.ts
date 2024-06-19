import { Injectable } from '@angular/core';
import { UserList } from '../../data/UserList';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userList: any[] = UserList;

    constructor() { }

    getUserList(): Observable<any> {
        return of(this.userList);
    }

    addUser(user: any) {
        this.userList.push(user);
    }

    updateUser(user: any) {
        let index = this.userList.findIndex(data => data.id == user.id);
        this.userList[index] = user;
    }

    deleteUser(user: any) {
        this.userList = this.userList.filter(data => data.id != user.id);
    }
}
