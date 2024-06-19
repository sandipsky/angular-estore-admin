import { Component, Signal, TemplateRef, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './user-info/user-info.component';
import { UserService } from './users.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SortEvent, SortableHeaderDirective } from '../../shared/directives/sortable/sortable-header.directive';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SortService } from '../../shared/services/sort.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [GeneralListComponent, AddUserComponent, SortableHeaderDirective, PaginatorComponent, SearchPipe, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  isListView: boolean = true;
  userList: any[] = [];
  sortedData: any[] = [];
  userDetail: any;
  mode: any;
  searchText: string = '';

  length: number = 0;
  pageIndex: WritableSignal<number> = signal(0);
  pageSize: WritableSignal<number> = signal(10);
  fromData: Signal<number> = computed(() => this.pageIndex() * this.pageSize());
  toData: Signal<number> = computed(() => this.fromData() + this.pageSize());

  @ViewChild('add', { static: true }) add!: TemplateRef<any>;

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
    private _toastrService: ToastrService,
    private _sortService: SortService
  ) { }

  ngOnInit() {
    this.getAllUser();
    console.log(this.fromData(), this.toData())
  }

  getAllUser() {
    this._userService.getUserList().subscribe(res => {
      this.userList = res;
      this.sortedData = this.userList;
      this.length = this.userList.length;
    });
  }


  onSort({ column, direction }: SortEvent) {
    if (direction === '' || column === '') {
      this.sortedData = this.userList;
    }
    else {
      this.sortedData = this._sortService.sortList([...this.userList], column, direction);
    }
  }


  onPageChange(pageData: any) {
    this.pageIndex.set(pageData.pageIndex);
    this.pageSize.set(pageData.pageSize);
  }

  showAddForm() {
    this.mode = 'Add';
    this.isListView = false;
  }

  editUser(user: any) {
    this.mode = 'Edit';
    this.userDetail = user;
    this.isListView = false;
  }

  viewUser(user: any) {
    this.mode = 'View';
    this.userDetail = user;
    this.isListView = false;
  }

  showList() {
    this.isListView = true;
    this.userDetail = null;
  }

  deleteUser(user: any) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { title: user.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._userService.deleteUser(user);
        this._toastrService.success('User Successfully Deleted', 'Success');
        this.getAllUser()
      }
    })
  }
}
