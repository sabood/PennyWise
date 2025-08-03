import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { transactions } from '@/lib/data';
import { AddTransactionDialog } from '@/components/transactions/add-transaction-dialog';
import { TransactionsTable } from '@/components/transactions/transactions-table';

export default function TransactionsPage() {
  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>View and manage all your income and expenses.</CardDescription>
            </div>
            <AddTransactionDialog />
        </CardHeader>
        <CardContent>
            <TransactionsTable transactions={transactions} />
        </CardContent>
      </Card>
    </main>
  );
}
