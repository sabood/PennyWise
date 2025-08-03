import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your account and application settings.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center h-96">
                    <SettingsIcon className="h-16 w-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">Settings Page</h3>
                    <p className="text-muted-foreground">This is where your settings will be.</p>
                </CardContent>
            </Card>
        </main>
    );
}
