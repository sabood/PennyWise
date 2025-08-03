
'use client';

import { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { budgets as initialBudgets, transactions } from '@/lib/data';
import { BudgetCard } from '@/components/budgets/budget-card';
import { SetBudgetDialog } from '@/components/budgets/set-budget-dialog';
import type { Budget } from '@/types';

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);

    const addBudget = (newBudget: Budget) => {
        setBudgets(prevBudgets => {
            const existingBudgetIndex = prevBudgets.findIndex(b => b.category === newBudget.category);
            if (existingBudgetIndex > -1) {
                const updatedBudgets = [...prevBudgets];
                updatedBudgets[existingBudgetIndex] = newBudget;
                return updatedBudgets;
            }
            return [...prevBudgets, newBudget];
        });
    };

    return (
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Budgets</CardTitle>
                        <CardDescription>Set and track your spending goals for each category.</CardDescription>
                    </div>
                    <SetBudgetDialog onBudgetSet={addBudget} />
                </CardHeader>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {budgets.map(budget => {
                    const spent = transactions
                        .filter(t => t.type === 'expense' && t.category === budget.category)
                        .reduce((sum, t) => sum + t.amount, 0);

                    return (
                        <BudgetCard key={budget.category} budget={budget} spent={spent} />
                    )
                })}
            </div>
        </main>
    );
}
