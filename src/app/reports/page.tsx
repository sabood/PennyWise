import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ReportsPage() {
    return (
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generate and view your financial reports.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center h-96">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">Reports Coming Soon</h3>
                    <p className="text-muted-foreground">This section is under construction. Soon you'll be able to generate weekly and monthly reports.</p>
                </CardContent>
            </Card>
        </main>
    );
}
