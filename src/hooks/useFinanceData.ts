import { useState } from 'react';
import { Transaction, Account, Loan, MonthlyData } from '@/types/finance';

const initialTransactions: Transaction[] = [
  // Diciembre 2024
  { id: '1', type: 'income', amount: 45000, category: 'Salario', description: 'Pago quincenal', date: '2024-12-15' },
  { id: '2', type: 'income', amount: 45000, category: 'Salario', description: 'Pago quincenal', date: '2024-12-31' },
  { id: '3', type: 'expense', amount: 12000, category: 'Renta', description: 'Renta mensual', date: '2024-12-01' },
  { id: '4', type: 'expense', amount: 3500, category: 'Servicios', description: 'Luz, agua, gas', date: '2024-12-05' },
  { id: '5', type: 'expense', amount: 8000, category: 'Supermercado', description: 'Despensa mensual', date: '2024-12-10' },
  { id: '6', type: 'expense', amount: 2500, category: 'Transporte', description: 'Gasolina', date: '2024-12-12' },
  { id: '7', type: 'income', amount: 30000, category: 'Freelance', description: 'Aguinaldo proyecto', date: '2024-12-20' },
  { id: '8', type: 'expense', amount: 15000, category: 'Entretenimiento', description: 'Regalos navidad', date: '2024-12-22' },
  // Noviembre 2024
  { id: '9', type: 'income', amount: 45000, category: 'Salario', description: 'Pago quincenal', date: '2024-11-15' },
  { id: '10', type: 'income', amount: 45000, category: 'Salario', description: 'Pago quincenal', date: '2024-11-30' },
  { id: '11', type: 'expense', amount: 12000, category: 'Renta', description: 'Renta mensual', date: '2024-11-01' },
  { id: '12', type: 'expense', amount: 4200, category: 'Servicios', description: 'Luz, agua, gas', date: '2024-11-05' },
  { id: '13', type: 'expense', amount: 9500, category: 'Supermercado', description: 'Despensa mensual', date: '2024-11-08' },
  { id: '14', type: 'income', amount: 5000, category: 'Freelance', description: 'Diseño logo', date: '2024-11-18' },
  { id: '15', type: 'expense', amount: 3000, category: 'Salud', description: 'Consulta médica', date: '2024-11-25' },
  // Octubre 2024
  { id: '16', type: 'income', amount: 45000, category: 'Salario', description: 'Pago quincenal', date: '2024-10-15' },
  { id: '17', type: 'income', amount: 45000, category: 'Salario', description: 'Pago quincenal', date: '2024-10-31' },
  { id: '18', type: 'expense', amount: 12000, category: 'Renta', description: 'Renta mensual', date: '2024-10-01' },
  { id: '19', type: 'expense', amount: 3800, category: 'Servicios', description: 'Luz, agua, gas', date: '2024-10-05' },
  { id: '20', type: 'expense', amount: 7500, category: 'Supermercado', description: 'Despensa mensual', date: '2024-10-10' },
  { id: '21', type: 'expense', amount: 2800, category: 'Transporte', description: 'Gasolina', date: '2024-10-14' },
  { id: '22', type: 'expense', amount: 1500, category: 'Entretenimiento', description: 'Netflix, Spotify', date: '2024-10-08' },
];

const initialAccounts: Account[] = [
  { id: '1', name: 'Cuenta Nómina', type: 'checking', balance: 28500, color: 'hsl(217 91% 60%)' },
  { id: '2', name: 'Ahorro Emergencia', type: 'savings', balance: 85000, color: 'hsl(160 84% 39%)' },
  { id: '3', name: 'Inversiones', type: 'investment', balance: 150000, color: 'hsl(280 70% 50%)' },
  { id: '4', name: 'Ahorro Vacaciones', type: 'savings', balance: 25000, color: 'hsl(38 92% 50%)' },
];

const initialLoans: Loan[] = [
  { id: '1', name: 'Hipoteca', type: 'mortgage', totalAmount: 2500000, remainingAmount: 2150000, monthlyPayment: 18500, interestRate: 9.5 },
  { id: '2', name: 'Préstamo Auto', type: 'personal', totalAmount: 350000, remainingAmount: 180000, monthlyPayment: 8500, interestRate: 12.0 },
  { id: '3', name: 'Tarjeta de Crédito', type: 'credit', totalAmount: 50000, remainingAmount: 15000, monthlyPayment: 3000, interestRate: 35.0 },
];

const monthlyDataHistory: MonthlyData[] = [
  { month: 'Ago', income: 85000, expenses: 52000, profit: 33000 },
  { month: 'Sep', income: 92000, expenses: 58000, profit: 34000 },
  { month: 'Oct', income: 88000, expenses: 45000, profit: 43000 },
  { month: 'Nov', income: 95000, expenses: 62000, profit: 33000 },
  { month: 'Dic', income: 120000, expenses: 85000, profit: 35000 },
  { month: 'Ene', income: 95000, expenses: 27500, profit: 67500 },
];

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [loans] = useState<Loan[]>(initialLoans);
  const [monthlyData] = useState<MonthlyData[]>(monthlyDataHistory);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Omit<Transaction, 'id'>>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalDebt = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  
  const currentMonthTransactions = transactions.filter(t => {
    const transDate = new Date(t.date);
    const now = new Date();
    return transDate.getMonth() === now.getMonth() && transDate.getFullYear() === now.getFullYear();
  });

  const monthlyIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyProfit = monthlyIncome - monthlyExpenses;

  return {
    transactions,
    accounts,
    loans,
    monthlyData,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalBalance,
    totalDebt,
    monthlyIncome,
    monthlyExpenses,
    monthlyProfit,
  };
}
