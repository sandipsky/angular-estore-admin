import { Component, TemplateRef, ViewChild } from '@angular/core';
import { GeneralListComponent } from '../general-list/general-list.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryService } from './category.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [GeneralListComponent, AddCategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  showPage: string = 'list';
  categoryList: any[] = []

  @ViewChild('add', { static: true }) add!: TemplateRef<any>;

  constructor(
    private _dialog: MatDialog,
    private _categoryService: CategoryService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this._categoryService.getCategoryList().subscribe(res => {
      this.categoryList = res;
    });
  }

  openAddDialog() {
    this._dialog.open(AddCategoryComponent);
  }

  editCategory(category: any) {
    this._dialog.open(AddCategoryComponent, {
      data: category
    });
  }

  deleteCategory(category: any) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { title: category.name }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._categoryService.deleteCategory(category);
        this._toastrService.success('Category Successfully Deleted', 'Success');
        this.getAllCategory()
      }
    })
  }
}
