import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgToggleModule } from 'ng-toggle-button';
import { CategoryService } from '../category.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatDialogModule, NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent {

  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.categoryForm = this._fb.group({
      id: [],
      name: [],
      status: [false]
    })
  }

  ngOnInit() {
    if (this.data) {
      this.categoryForm.patchValue(this.data);
    }
  }

  onSave() {
    if (this.categoryForm.value.id == null) {
      this._categoryService.addCategory(this.categoryForm.value);
      this._toastrService.success('Category Successfully Created', 'Success');
    }
    else {
      this._categoryService.updateCategory(this.categoryForm.value);
      this._toastrService.success('Category Successfully Updated', 'Success');
    }
    this.categoryForm.reset();
    this.dialogRef.close();
  }

}
