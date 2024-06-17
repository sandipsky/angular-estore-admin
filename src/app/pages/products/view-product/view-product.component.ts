import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  @Output() onExit: EventEmitter<void> = new EventEmitter<void>();

  exit() {
    this.onExit.emit();
  }
}
