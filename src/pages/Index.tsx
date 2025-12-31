import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, LayoutDashboard } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { AccountCard } from '@/components/AccountCard';
import { LoanCard } from '@/components/LoanCard';
import { TransactionList } from '@/components/TransactionList';
import { TrendChart } from '@/components/TrendChart';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { useFinanceData } from '@/hooks/useFinanceData';


const Index = () => {
  const {
    transactions,
    accounts,
    loans,
    monthlyData,
    addTransaction,
    totalBalance,
    totalDebt,
    monthlyIncome,
    monthlyExpenses,
    monthlyProfit,
  } = useFinanceData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/20">
                <LayoutDashboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">FinanzApp</h1>
                <p className="text-xs text-muted-foreground">Administrador de Finanzas</p>
              </div>
            </div>
            <AddTransactionDialog onAdd={addTransaction} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Balance Total"
            value={formatCurrency(totalBalance)}
            icon={Wallet}
            variant="accent"
            trend={{ value: 12, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Ingresos del Mes"
            value={formatCurrency(monthlyIncome)}
            icon={TrendingUp}
            variant="success"
            trend={{ value: 8, isPositive: true }}
            delay={100}
          />
          <StatCard
            title="Gastos del Mes"
            value={formatCurrency(monthlyExpenses)}
            icon={TrendingDown}
            variant="danger"
            trend={{ value: 5, isPositive: false }}
            delay={200}
          />
          <StatCard
            title="Utilidad del Mes"
            value={formatCurrency(monthlyProfit)}
            icon={PiggyBank}
            variant={monthlyProfit >= 0 ? 'success' : 'danger'}
            delay={300}
          />
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart and Transactions Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trend Chart */}
            <TrendChart data={monthlyData} />

            {/* Transaction List with Filters */}
            <TransactionList transactions={transactions} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Accounts */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Mis Cuentas</h3>
                <span className="text-sm text-primary font-medium">{formatCurrency(totalBalance)}</span>
              </div>
              <div className="space-y-3">
                {accounts.map((account, index) => (
                  <AccountCard 
                    key={account.id} 
                    account={account}
                    delay={500 + index * 100}
                  />
                ))}
              </div>
            </div>

            {/* Loans */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-destructive" />
                  <h3 className="text-lg font-semibold">Deudas</h3>
                </div>
                <span className="text-sm text-destructive font-medium">{formatCurrency(totalDebt)}</span>
              </div>
              <div className="space-y-4">
                {loans.map((loan, index) => (
                  <LoanCard 
                    key={loan.id} 
                    loan={loan}
                    delay={700 + index * 100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
