import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../products.service';
import { NgToggleModule } from 'ng-toggle-button';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  @Input() productData: any = null;
  @Output() onExit: EventEmitter<void> = new EventEmitter<void>();

  mode: string = 'Add'
  productForm: FormGroup;

  constructor(
    private _productService: ProductService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {
    this.productForm = this._fb.group({
      id: [],
      name: [],
      category: [],
      brand: [],
      price: [],
      quantity_in_stock: [],
      description: [],
      status: [false],
      isFeatured: [false]
    })
  }

  ngOnInit() {
    if (this.productData != null) {
      this.mode = 'Edit';
      this.productForm.patchValue(this.productData);
    }
  }

  onSave() {
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
