import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx-js-style';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }

  exportExcelTable(tableId: string, fileName: string) {
    const table = document.getElementById(tableId) as HTMLTableElement;
    const rows = Array.from(table.rows);

    // Exclude the last cell
    const data = rows.map(row => {
      const cells = Array.from(row.cells).slice(0, -1);
      return cells.map(cell => cell.innerText);
    });

    // Remove elements with particular class from each row in the cloned table
    // const rows = clonedTable.querySelectorAll('tr');
    // rows.forEach((row:any) => {
    //   const deletableCells =  row.querySelectorAll('.deletable-cell');
    //   deletableCells.forEach((cell:any) =>{
    //     row.removeChild(cell);
    //   })
    // });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  exportPDFTable(tableId: string, fileName: string) {
    const table = document.getElementById(tableId) as HTMLTableElement;
    const rows = Array.from(table.rows);

    const body = rows.map(row => {
      const cells = Array.from(row.cells).slice(0, -1);
      return cells.map(cell => {
        return { text: cell.innerText, style: 'tableCell' };
      });
    });

    const docDefinition: any = {
      content: [
        {
          table: {
            headerRows: 1,
            body: body
          }
        }
      ],
      styles: {
        tableCell: {
          margin: [5, 5, 5, 5]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
  }
}
