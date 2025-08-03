'use client';

import { OverviewCard } from '@/components/dashboard/overview-card';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SpendingChart } from '@/components/dashboard/spending-chart';
import { AiSuggestions } from '@/components/dashboard/ai-suggestions';
import { transactions } from '@/lib/data';
import { Banknote, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { totalIncome, totalExpenses, netBalance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome: income,
      totalExpenses: expenses,
      netBalance: income - expenses,
    };
  }, []);

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            icon={TrendingUp}
            description="Total income this month"
          />
          <OverviewCard
            title="Total Expenses"
            value={`$${totalExpenses.toLocaleString()}`}
            icon={TrendingDown}
            description="Total expenses this month"
          />
          <OverviewCard
            title="Net Balance"
            value={`$${netBalance.toLocaleString()}`}
            icon={Scale}
            description="Your current balance"
          />
          <OverviewCard
            title="Active Budgets"
            value="4"
            icon={Banknote}
            description="Budgets you are tracking"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-4">
            <SpendingChart transactions={transactions} />
          </div>
          <div className="lg:col-span-3">
            <AiSuggestions currentIncome={totalIncome} currentExpenses={transactions.filter(t => t.type === 'expense')} />
          </div>
        </div>
        <div>
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        </div>
      </div>
    </main>
  );
}
