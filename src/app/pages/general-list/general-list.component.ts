import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-general-list',
  standalone: true,
  imports: [],
  templateUrl: './general-list.component.html',
  styleUrl: './general-list.component.scss'
})
export class GeneralListComponent {
  @Input() title: string = '';
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
