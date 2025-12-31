import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';
import { Transaction } from '@/types/finance';
import { cn } from '@/lib/utils';
import { EditTransactionDialog } from '@/components/EditTransactionDialog';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface TransactionItemProps {
  transaction: Transaction;
  delay?: number;
  onUpdate?: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
  onDelete?: (id: string) => void;
}

export function TransactionItem({ transaction, delay = 0, onUpdate, onDelete }: TransactionItemProps) {
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
        "hover:bg-muted/50 transition-colors group",
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
      <div className="flex items-center gap-2">
        <p className={cn(
          "font-semibold",
          isIncome ? "text-success" : "text-destructive"
        )}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
        {onUpdate && onDelete && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <EditTransactionDialog transaction={transaction} onUpdate={onUpdate} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-card border-border/50">
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar transacción?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Se eliminará permanentemente esta transacción.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-muted/50 border-border/50">Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => onDelete(transaction.id)}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
