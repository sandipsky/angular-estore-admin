import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../users.service';
import { NgToggleModule } from 'ng-toggle-button';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [NgToggleModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-info.component.html',
})
export class AddUserComponent {
  @Input() userData: any = null;
  @Input() mode: any = 'Add';
  @Output() onExit: EventEmitter<void> = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService
  ) {
    this.userForm = this._fb.group({
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
    if (this.userData != null) {
      this.userForm.patchValue(this.userData);
    }
  }

  onSave() {
    if (this.userForm.value.id == null) {
      this._userService.addUser(this.userForm.value);
      this._toastrService.success('User Successfully Added', 'Success');
    }
    else {
      this._userService.updateUser(this.userForm.value);
      this._toastrService.success('User Successfully Updated', 'Success');
    }
    this.exit();
  }

  exit() {
    this.onExit.emit();
    this.userForm.reset();
  }
}
