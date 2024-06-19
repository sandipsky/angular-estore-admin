import { Component, Signal, TemplateRef, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCustomerComponent } from './customer-info/customer-info.component';
import { CustomerService } from './customers.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SortEvent, SortableHeaderDirective } from '../../shared/directives/sortable/sortable-header.directive';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { SearchPipe } from '../../shared/pipes/search.pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { SortService } from '../../services/sort.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [GeneralListComponent, AddCustomerComponent, SortableHeaderDirective, PaginatorComponent, SearchPipe, FormsModule],
  templateUrl: './customers.component.html',
})
export class CustomersComponent {
  isListView: boolean = true;
  customerList: any[] = [];
  sortedData: any[] = [];
  customerDetail: any;
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
    private _customerService: CustomerService,
    private _toastrService: ToastrService,
    private _sortService: SortService
  ) { }

  ngOnInit() {
    this.getAllCustomer();
    console.log(this.fromData(), this.toData())
  }

  getAllCustomer() {
    this._customerService.getCustomerList().subscribe(res => {
      this.customerList = res;
      this.sortedData = this.customerList;
      this.length = this.customerList.length;
    });
  }


  onSort({ column, direction }: SortEvent) {
    if (direction === '' || column === '') {
      this.sortedData = this.customerList;
    }
    else {
      this.sortedData = this._sortService.sortList([...this.customerList], column, direction);
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

  editCustomer(customer: any) {
    this.mode = 'Edit';
    this.customerDetail = customer;
    this.isListView = false;
  }

  viewCustomer(customer: any) {
    this.mode = 'View';
    this.customerDetail = customer;
    this.isListView = false;
  }

  showList() {
    this.isListView = true;
    this.customerDetail = null;
  }

  deleteCustomer(customer: any) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { title: customer.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._customerService.deleteCustomer(customer);
        this._toastrService.success('Customer Successfully Deleted', 'Success');
        this.getAllCustomer()
      }
    })
  }
}
