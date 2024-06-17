import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgToggleModule } from 'ng-toggle-button';
import { BrandService } from '../brand.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [MatDialogModule, NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.scss'
})
export class AddBrandComponent {

  brandForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBrandComponent>,
    private _brandService: BrandService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.brandForm = this._fb.group({
      id: [],
      name: [],
      status: [false]
    })
  }

  ngOnInit() {
    if (this.data) {
      this.brandForm.patchValue(this.data);
    }
  }

  onSave() {
    if (this.brandForm.value.id == null) {
      this._brandService.addBrand(this.brandForm.value);
      this._toastrService.success('Brand Successfully Created', 'Success');
    }
    else {
      this._brandService.updateBrand(this.brandForm.value);
      this._toastrService.success('Brand Successfully Updated', 'Success');
    }
    this.brandForm.reset();
    this.dialogRef.close();
  }

}
