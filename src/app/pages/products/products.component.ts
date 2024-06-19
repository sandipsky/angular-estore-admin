import { Component, Signal, TemplateRef, ViewChild, WritableSignal, computed, signal } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './product-info/product-info.component';
import { ProductService } from './products.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SortEvent, SortableHeaderDirective } from '../../shared/directives/sortable/sortable-header.directive';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';
import { SearchPipe } from '../../shared/pipes/search.pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { SortService } from '../../shared/services/sort.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [GeneralListComponent, AddProductComponent, SortableHeaderDirective, PaginatorComponent, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  isListView: boolean = true;
  productList: any[] = [];
  sortedData: any[] = [];
  productDetail: any;
  mode: any;
  searchText: string = '';
  isLoading: boolean = true;

  length: number = 0;
  pageIndex: WritableSignal<number> = signal(0);
  pageSize: WritableSignal<number> = signal(10);
  fromData: Signal<number> = computed(() => this.pageIndex() * this.pageSize());
  toData: Signal<number> = computed(() => this.fromData() + this.pageSize());

  @ViewChild('add', { static: true }) add!: TemplateRef<any>;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _toastrService: ToastrService,
    private _sortService: SortService
  ) { }

  ngOnInit() {
    this.getAllProduct();
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

  getAllProduct() {
    this._productService.getProductList().subscribe(res => {
      this.productList = res;
      this.sortedData = this.productList;
      this.length = this.productList.length;
    });
  }


  onSort({ column, direction }: SortEvent) {
    if (direction === '' || column === '') {
      this.sortedData = this.productList;
    }
    else {
      this.sortedData = this._sortService.sortList([...this.productList], column, direction);
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

  editProduct(product: any) {
    this.mode = 'Edit';
    this.productDetail = product;
    this.isListView = false;
  }

  viewProduct(product: any) {
    this.mode = 'View';
    this.productDetail = product;
    this.isListView = false;
  }

  showList() {
    this.isListView = true;
    this.productDetail = null;
  }

  deleteProduct(product: any) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { title: product.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._productService.deleteProduct(product);
        this._toastrService.success('Product Successfully Deleted', 'Success');
        this.getAllProduct()
      }
    })
  }
}
