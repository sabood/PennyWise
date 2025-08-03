import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import type { Transaction } from "@/types";
  import { categoryDetails } from "@/lib/data";
  
  interface TransactionsTableProps {
    transactions: Transaction[];
  }
  
  export function TransactionsTable({ transactions }: TransactionsTableProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const Icon = categoryDetails[transaction.category]?.icon;
            return (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                        <span>{transaction.category}</span>
                    </div>
                </TableCell>
                <TableCell>
                  <Badge variant={transaction.type === 'income' ? 'secondary' : 'outline'}>
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
  