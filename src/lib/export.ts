import { Transaction } from '@/types/finance';
import * as XLSX from 'xlsx';

export function exportToCSV(transactions: Transaction[], filename: string = 'transacciones') {
  const headers = ['Fecha', 'Tipo', 'Categoría', 'Descripción', 'Monto'];
  
  const rows = transactions.map(t => [
    t.date,
    t.type === 'income' ? 'Ingreso' : 'Gasto',
    t.category,
    t.description,
    t.type === 'income' ? t.amount : -t.amount,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}

export function exportToExcel(transactions: Transaction[], filename: string = 'transacciones') {
  const data = transactions.map(t => ({
    'Fecha': t.date,
    'Tipo': t.type === 'income' ? 'Ingreso' : 'Gasto',
    'Categoría': t.category,
    'Descripción': t.description,
    'Monto': t.type === 'income' ? t.amount : -t.amount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transacciones');
  
  // Auto-size columns
  const colWidths = [
    { wch: 12 }, // Fecha
    { wch: 10 }, // Tipo
    { wch: 15 }, // Categoría
    { wch: 30 }, // Descripción
    { wch: 15 }, // Monto
  ];
  worksheet['!cols'] = colWidths;

  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
