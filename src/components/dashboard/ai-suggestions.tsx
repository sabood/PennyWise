'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Wand2, ThumbsUp } from 'lucide-react';
import { getAISuggestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { Transaction } from '@/types';
import { Skeleton } from '../ui/skeleton';

interface AiSuggestionsProps {
    currentIncome: number;
    currentExpenses: Transaction[];
}

const formSchema = z.object({
  goal: z.coerce.number().positive({ message: "Please enter a positive number for your goal." }),
});

export function AiSuggestions({ currentIncome, currentExpenses }: AiSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: 500,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions([]);
    
    const expensesMap = currentExpenses.reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    const result = await getAISuggestions({
      income: currentIncome,
      expenses: expensesMap,
      goal: values.goal,
    });
    
    setIsLoading(false);
    if (result.success && result.suggestions) {
      setSuggestions(result.suggestions);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to get suggestions.',
      });
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-accent" />
          <span>AI Budget Helper</span>
        </CardTitle>
        <CardDescription>
          Enter your target monthly balance and let AI suggest how to get there.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Balance ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Generating...' : 'Get Suggestions'}
            </Button>
          </form>
        </Form>
        <div className="mt-4 space-y-2">
          {isLoading && (
            <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
            </>
          )}
          {suggestions.length > 0 && (
            <ul className="space-y-2 list-none p-0">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ThumbsUp className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
       <CardFooter>
        <p className="text-xs text-muted-foreground">Powered by Generative AI.</p>
       </CardFooter>
    </Card>
  );
}
