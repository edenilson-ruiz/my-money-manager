import { useState, useMemo } from 'react';
import { Calendar, Download, FileSpreadsheet, Filter, X } from 'lucide-react';
import { Transaction } from '@/types/finance';
import { TransactionItem } from '@/components/TransactionItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToCSV, exportToExcel } from '@/lib/export';
import { useToast } from '@/hooks/use-toast';

interface TransactionListProps {
  transactions: Transaction[];
  onUpdate?: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

const months = [
  { value: '0', label: 'Enero' },
  { value: '1', label: 'Febrero' },
  { value: '2', label: 'Marzo' },
  { value: '3', label: 'Abril' },
  { value: '4', label: 'Mayo' },
  { value: '5', label: 'Junio' },
  { value: '6', label: 'Julio' },
  { value: '7', label: 'Agosto' },
  { value: '8', label: 'Septiembre' },
  { value: '9', label: 'Octubre' },
  { value: '10', label: 'Noviembre' },
  { value: '11', label: 'Diciembre' },
];

export function TransactionList({ transactions, onUpdate, onDelete }: TransactionListProps) {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Get unique years from transactions
  const years = useMemo(() => {
    const uniqueYears = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))];
    return uniqueYears.sort((a, b) => b - a);
  }, [transactions]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const date = new Date(t.date);
      const matchesMonth = selectedMonth === 'all' || date.getMonth().toString() === selectedMonth;
      const matchesYear = selectedYear === 'all' || date.getFullYear().toString() === selectedYear;
      const matchesType = selectedType === 'all' || t.type === selectedType;
      return matchesMonth && matchesYear && matchesType;
    });
  }, [transactions, selectedMonth, selectedYear, selectedType]);

  // Calculate totals for filtered transactions
  const totals = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [filteredTransactions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const hasFilters = selectedMonth !== 'all' || selectedYear !== 'all' || selectedType !== 'all';

  const clearFilters = () => {
    setSelectedMonth('all');
    setSelectedYear('all');
    setSelectedType('all');
  };

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      toast({
        title: 'Sin datos',
        description: 'No hay transacciones para exportar',
        variant: 'destructive',
      });
      return;
    }
    exportToCSV(filteredTransactions);
    toast({
      title: 'Exportación exitosa',
      description: `Se exportaron ${filteredTransactions.length} transacciones a CSV`,
    });
  };

  const handleExportExcel = () => {
    if (filteredTransactions.length === 0) {
      toast({
        title: 'Sin datos',
        description: 'No hay transacciones para exportar',
        variant: 'destructive',
      });
      return;
    }
    exportToExcel(filteredTransactions);
    toast({
      title: 'Exportación exitosa',
      description: `Se exportaron ${filteredTransactions.length} transacciones a Excel`,
    });
  };

  return (
    <div className="glass-card rounded-xl p-5">
      {/* Header with filters */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Historial de Transacciones</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border/50">
              <DropdownMenuItem onClick={handleExportCSV} className="gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4" />
                Exportar a CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel} className="gap-2 cursor-pointer">
                <FileSpreadsheet className="h-4 w-4 text-success" />
                Exportar a Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Filtrar:</span>
          </div>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[130px] h-9 bg-muted/50 border-border/50">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/50">
              <SelectItem value="all">Todos</SelectItem>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[100px] h-9 bg-muted/50 border-border/50">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/50">
              <SelectItem value="all">Todos</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[120px] h-9 bg-muted/50 border-border/50">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border/50">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Ingresos</SelectItem>
              <SelectItem value="expense">Gastos</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-9 gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Limpiar
            </Button>
          )}
        </div>

        {/* Summary for filtered results */}
        <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Ingresos:</span>
            <span className="font-semibold text-success">{formatCurrency(totals.income)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Gastos:</span>
            <span className="font-semibold text-destructive">{formatCurrency(totals.expenses)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Balance:</span>
            <span className={`font-semibold ${totals.balance >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(totals.balance)}
            </span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-muted-foreground">{filteredTransactions.length} transacciones</span>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <ScrollArea className="h-[350px] scrollbar-thin">
        <div className="space-y-1">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Filter className="h-12 w-12 mb-3 opacity-50" />
              <p>No hay transacciones para mostrar</p>
              <p className="text-sm">Prueba ajustando los filtros</p>
            </div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction}
                delay={index * 30}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
