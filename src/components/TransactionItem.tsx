import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction } from '@/types/finance';
import { cn } from '@/lib/utils';

interface TransactionItemProps {
  transaction: Transaction;
  delay?: number;
}

export function TransactionItem({ transaction, delay = 0 }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between py-3 px-4 rounded-lg",
        "hover:bg-muted/50 transition-colors cursor-pointer",
        "opacity-0 animate-fade-in"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-lg",
          isIncome ? "bg-success/20" : "bg-destructive/20"
        )}>
          {isIncome ? (
            <ArrowUpRight className="h-4 w-4 text-success" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm">{transaction.description}</p>
          <p className="text-xs text-muted-foreground">{transaction.category} • {formatDate(transaction.date)}</p>
        </div>
      </div>
      <p className={cn(
        "font-semibold",
        isIncome ? "text-success" : "text-destructive"
      )}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}
