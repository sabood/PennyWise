'use client';

import * as React from 'react';
import { Pie, PieChart, Cell, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { Transaction } from '@/types';
import { categoryDetails } from '@/lib/data';

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const chartData = React.useMemo(() => {
    const spendingByCategory: { [key: string]: number } = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        spendingByCategory[t.category] = (spendingByCategory[t.category] || 0) + t.amount;
      });

    return Object.entries(spendingByCategory).map(([name, value]) => ({
      name,
      value,
      fill: categoryDetails[name as keyof typeof categoryDetails]?.color || '#ccc',
    }));
  }, [transactions]);

  const chartConfig = {
    value: {
      label: 'Value',
    },
    ...chartData.reduce((acc, cur) => ({...acc, [cur.name]: {label: cur.name}}), {})
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>A breakdown of your expenses for this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[300px]">
          <PieChart>
            <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
