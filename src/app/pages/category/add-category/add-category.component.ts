import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgToggleModule } from 'ng-toggle-button';
import { CategoryService } from '../category.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [MatDialogModule, NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
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
    }
    else {
      this._categoryService.updateCategory(this.categoryForm.value);
    }
    this.categoryForm.reset();
    this.dialogRef.close();
  }

}
