import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PdfUtil {
  static exportPDFTable(tableId: string, fileName: string) {
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
