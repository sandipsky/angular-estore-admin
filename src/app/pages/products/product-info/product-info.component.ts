import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../products.service';
import { NgToggleModule } from 'ng-toggle-button';
import { RequiredInputDirective } from '../../../shared/directives/required-input-directive/required-input.directive';
import { PositiveNumberDirective } from '../../../shared/directives/positive-number-directive/positive-number.directive';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [NgToggleModule, FormsModule, ReactiveFormsModule, RequiredInputDirective, PositiveNumberDirective],
  templateUrl: './product-info.component.html',
})
export class AddProductComponent {
  @Input() productData: any = null;
  @Input() mode: any = 'Add';
  @Output() onExit: EventEmitter<void> = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(
    private _productService: ProductService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {
    this.productForm = this._fb.group({
      id: [],
      name: [, Validators.required],
      category: [, Validators.required],
      brand: [, Validators.required],
      price: [, Validators.required],
      quantity_in_stock: [, Validators.required],
      description: [],
      status: [false, Validators.required],
      isFeatured: [false, Validators.required]
    })
  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit() {
    if (this.productData != null) {
      this.productForm.patchValue(this.productData);
    }
  }

  onSave() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      return;
    }

    if (this.productForm.value.id == null) {
      this._productService.addProduct(this.productForm.value);
      this._toastrService.success('Product Successfully Added', 'Success');
    }
    else {
      this._productService.updateProduct(this.productForm.value);
      this._toastrService.success('Product Successfully Updated', 'Success');
    }
    this.exit();
  }

  exit() {
    this.onExit.emit();
    this.productForm.reset();
  }
}
