'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { categoryDetails } from '@/lib/data';
import type { Budget } from '@/types';
import { useState, useEffect } from 'react';

interface BudgetCardProps {
  budget: Budget;
  spent: number;
}

export function BudgetCard({ budget, spent }: BudgetCardProps) {
  const { category, limit } = budget;
  const Icon = categoryDetails[category]?.icon;
  const progress = Math.min((spent / limit) * 100, 100);
  const remaining = limit - spent;
  
  const [progressColor, setProgressColor] = useState('');

  useEffect(() => {
    if (progress > 90) setProgressColor('bg-red-500');
    else if (progress > 75) setProgressColor('bg-yellow-500');
    else setProgressColor('bg-primary');
  }, [progress]);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          {category}
        </CardTitle>
        <span className="text-sm font-medium">${limit.toLocaleString()}</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${spent.toLocaleString()}</div>
        <p className={`text-xs ${remaining >= 0 ? 'text-muted-foreground' : 'text-red-500'}`}>
          {remaining >= 0 ? `$${remaining.toLocaleString()} left` : `$${Math.abs(remaining).toLocaleString()} over`}
        </p>
        <Progress value={progress} className="mt-4 h-2" indicatorClassName={progressColor} />
      </CardContent>
    </Card>
  );
}
