import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DocumentService } from '../../shared/services/document.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

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

  constructor(
    private _documentService: DocumentService
  ) { }

  exportExcel() {
    this._documentService.exportExcelTable('export-table', this.title);
  }

  exportPDF() {
    this._documentService.exportPDFTable('export-table', this.title);
  }

  emitAddEvent() {
    this.onAdd.emit();
  }
}
