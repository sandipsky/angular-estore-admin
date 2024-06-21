import * as XLSX from 'xlsx-js-style';

export class ExcelUtil {
    static exportExcelTable(tableId: string, fileName: string) {
        const table = document.getElementById(tableId) as HTMLTableElement;
        const rows = Array.from(table.rows);

        const data = rows.map(row => {
            const cells = Array.from(row.cells).slice(0, -1);
            return cells.map(cell => cell.innerText);
        });

        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
}
