import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ExcelUtil } from '../../shared/utils/excel.util'
import { PdfUtil } from '../../shared/utils/pdf.util';

@Component({
  selector: 'app-general-list',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './general-list.component.html',
  styleUrl: './general-list.component.scss'
})
export class GeneralListComponent {
  @Input() title: string = '';
  @Input() loading: boolean = false;
  @Input() showAdd: boolean = true;
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  exportExcel() {
    ExcelUtil.exportExcelTable('export-table', this.title);
  }

  exportPDF() {
    PdfUtil.exportPDFTable('export-table', this.title);
  }

  emitAddEvent() {
    this.onAdd.emit();
  }
}
