import { Component, Signal, TemplateRef, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from './orders.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SortEvent, SortableHeaderDirective } from '../../shared/directives/sortable/sortable-header.directive';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { SortService } from '../../shared/services/sort.service';
import { AmountPipe } from '../../shared/pipes/amount.pipe';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [GeneralListComponent, SortableHeaderDirective, PaginatorComponent, SearchPipe, FormsModule, AmountPipe],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  isListView: boolean = true;
  orderList: any[] = [];
  sortedData: any[] = [];
  orderDetail: any;
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
    private _orderService: OrderService,
    private _toastrService: ToastrService,
    private _sortService: SortService
  ) { }

  ngOnInit() {
    this.getAllOrder();
    console.log(this.fromData(), this.toData())
  }

  getAllOrder() {
    this._orderService.getOrderList().subscribe(res => {
      this.orderList = res;
      this.sortedData = this.orderList;
      this.length = this.orderList.length;
    });
  }


  onSort({ column, direction }: SortEvent) {
    if (direction === '' || column === '') {
      this.sortedData = this.orderList;
    }
    else {
      this.sortedData = this._sortService.sortList([...this.orderList], column, direction);
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

  editOrder(order: any) {
    this.mode = 'Edit';
    this.orderDetail = order;
    this.isListView = false;
  }

  viewOrder(order: any) {
    this.mode = 'View';
    this.orderDetail = order;
    this.isListView = false;
  }

  showList() {
    this.isListView = true;
    this.orderDetail = null;
  }

  deleteOrder(order: any) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { title: order.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._orderService.deleteOrder(order);
        this._toastrService.success('Order Successfully Deleted', 'Success');
        this.getAllOrder()
      }
    })
  }
}
