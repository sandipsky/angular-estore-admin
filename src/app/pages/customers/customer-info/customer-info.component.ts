import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customers.service';
import { NgToggleModule } from 'ng-toggle-button';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-info.component.html',
})
export class AddCustomerComponent {
  @Input() customerData: any = null;
  @Input() mode: any = 'Add';
  @Output() onExit: EventEmitter<void> = new EventEmitter<void>();

  customerForm: FormGroup;

  constructor(
    private _customerService: CustomerService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {
    this.customerForm = this._fb.group({
      id: [],
      name: [],
      customername: [],
      email: [],
      password: [],
    })
  }

  ngOnInit() {
    if (this.customerData != null) {
      this.customerForm.patchValue(this.customerData);
      this.customerForm.get('password')?.setValue(null);
    }
  }

  onSave() {
    if (this.customerForm.value.id == null) {
      this._customerService.addCustomer(this.customerForm.value);
      this._toastrService.success('Customer Successfully Added', 'Success');
    }
    else {
      this._customerService.updateCustomer(this.customerForm.value);
      this._toastrService.success('Customer Successfully Updated', 'Success');
    }
    this.exit();
  }

  exit() {
    this.onExit.emit();
    this.customerForm.reset();
  }
}
