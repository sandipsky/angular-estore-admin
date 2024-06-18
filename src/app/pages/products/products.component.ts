import { Component, TemplateRef, ViewChild } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from './products.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { SortEvent, SortableHeaderDirective } from '../../shared/directives/sortable/sortable-header.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [GeneralListComponent, AddProductComponent, SortableHeaderDirective],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  isListView: boolean = true;
  productList: any[] = [];
  productDetail: any;
  mode: any;

  @ViewChild('add', { static: true }) add!: TemplateRef<any>;

  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllProduct()
  }

  getAllProduct() {
    this._productService.getProductList().subscribe(res => {
      this.productList = res;
    });
  }

  onSort(event: SortEvent) {

  }

  onPageChange() {

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
