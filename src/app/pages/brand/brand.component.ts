import { Component, TemplateRef, ViewChild } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandService } from './brand.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [GeneralListComponent, AddBrandComponent],
  templateUrl: './brand.component.html',
})
export class BrandComponent {
  showPage: string = 'list';
  brandList: any[] = []

  @ViewChild('add', { static: true }) add!: TemplateRef<any>;

  constructor(
    private _dialog: MatDialog,
    private _brandService: BrandService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllBrand()
  }

  getAllBrand() {
    this._brandService.getBrandList().subscribe(res => {
      this.brandList = res;
    });
  }

  openAddDialog() {
    this._dialog.open(AddBrandComponent);
  }

  editBrand(brand: any) {
    this._dialog.open(AddBrandComponent, {
      data: brand
    });
  }

  deleteBrand(brand: any) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { title: brand.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._brandService.deleteBrand(brand);
        this._toastrService.success('Brand Successfully Deleted', 'Success');
        this.getAllBrand()
      }
    })
  }
}
