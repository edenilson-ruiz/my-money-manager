import { Wallet, TrendingUp, PiggyBank } from 'lucide-react';
import { Account } from '@/types/finance';
import { cn } from '@/lib/utils';

interface AccountCardProps {
  account: Account;
  delay?: number;
}

const iconMap = {
  checking: Wallet,
  savings: PiggyBank,
  investment: TrendingUp,
};

export function AccountCard({ account, delay = 0 }: AccountCardProps) {
  const Icon = iconMap[account.type];
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-4 opacity-0 animate-fade-in",
        "hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="p-2.5 rounded-lg transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${account.color}20` }}
        >
          <Icon className="h-5 w-5" style={{ color: account.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground truncate">{account.name}</p>
          <p className="text-lg font-semibold">{formatCurrency(account.balance)}</p>
        </div>
      </div>
    </div>
  );
}
