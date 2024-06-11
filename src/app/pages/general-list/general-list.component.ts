import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-general-list',
  standalone: true,
  imports: [],
  templateUrl: './general-list.component.html',
  styleUrl: './general-list.component.scss'
})
export class GeneralListComponent {
  @Input() title: string = '';
  @Output() onExcelExport: EventEmitter<void> = new EventEmitter<void>();
  @Output() onPDFExport: EventEmitter<void> = new EventEmitter<void>();
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  emitExcelEvent() {
    this.onExcelExport.emit();
  }

  emitPDFEvent() {
    this.onPDFExport.emit();
  }

  emitAddEvent() {
    this.onAdd.emit();
  }
}
