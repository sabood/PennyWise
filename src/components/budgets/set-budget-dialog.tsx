'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryDetails } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import type { CategoryName } from '@/types';

export function SetBudgetDialog() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<CategoryName | ''>('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const expenseCategories = Object.keys(categoryDetails).filter(
    (c) => c !== 'Salary'
  ) as CategoryName[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !limit) {
      setError('Please fill out all fields.');
      return;
    }
    if (isNaN(Number(limit)) || Number(limit) <= 0) {
      setError('Please enter a valid positive number for the limit.');
      return;
    }
    setError('');
    console.log({ category, limit: Number(limit) });
    // Here you would typically call an action to save the budget
    toast({
      title: 'Success!',
      description: `Budget for ${category} has been set to $${limit}.`,
    });
    setOpen(false);
    setCategory('');
    setLimit('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Set New Budget</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Budget</DialogTitle>
          <DialogDescription>
            Set a new spending limit for a category. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as CategoryName)}
              >
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limit" className="text-right">
                Limit
              </Label>
              <Input
                id="limit"
                type="number"
                placeholder="e.g., 500"
                className="col-span-3"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
             {error && <p className="text-red-500 text-sm col-span-4 text-center">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="submit">Save budget</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
