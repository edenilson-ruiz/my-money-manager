import { Home, Car, CreditCard } from 'lucide-react';
import { Loan } from '@/types/finance';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface LoanCardProps {
  loan: Loan;
  delay?: number;
}

const iconMap = {
  mortgage: Home,
  personal: Car,
  credit: CreditCard,
};

export function LoanCard({ loan, delay = 0 }: LoanCardProps) {
  const Icon = iconMap[loan.type];
  const progress = ((loan.totalAmount - loan.remainingAmount) / loan.totalAmount) * 100;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-4 opacity-0 animate-fade-in",
        "hover:scale-[1.02] transition-all duration-300"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-destructive/20">
            <Icon className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="font-medium">{loan.name}</p>
            <p className="text-xs text-muted-foreground">{loan.interestRate}% anual</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Pago mensual</p>
          <p className="font-semibold text-destructive">{formatCurrency(loan.monthlyPayment)}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Restante</span>
          <span className="font-medium">{formatCurrency(loan.remainingAmount)}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{progress.toFixed(0)}% pagado</span>
          <span>de {formatCurrency(loan.totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}
