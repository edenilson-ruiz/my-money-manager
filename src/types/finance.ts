export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
  accountId?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'savings' | 'checking' | 'investment';
  balance: number;
  color: string;
}

export interface Loan {
  id: string;
  name: string;
  type: 'personal' | 'mortgage' | 'credit';
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}
