import { Component, TemplateRef, ViewChild } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductService } from './products.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ViewProductComponent } from './view-product/view-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [GeneralListComponent, AddProductComponent, ViewProductComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  showPage: string = 'list';
  productList: any[] = [];
  productDetail: any;

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

  showAddForm() {
    this.showPage = 'form';
  }

  editProduct(product: any) {
    this.productDetail = product;
    this.showPage = 'form';
  }

  showList() {
    this.showPage = 'list';
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
