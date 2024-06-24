import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgToggleModule } from 'ng-toggle-button';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AmountPipe } from '../../../shared/pipes/amount.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderService } from '../orders.service';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [MatDialogModule, NgToggleModule, FormsModule, AmountPipe, NgSelectModule],
  templateUrl: './view-order.component.html',
})
export class ViewOrderComponent {

  statusList: string[] = ['Pending', 'Delivered', 'Cancelled']

  constructor(
    public dialogRef: MatDialogRef<ViewOrderComponent>,
    private _toastrService: ToastrService,
    private _orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
  }

  updateOrder(order: any) {
    this._orderService.updateOrder(this.data);
    this._toastrService.success('Status Successfully Updated', 'Success');
  }

}
