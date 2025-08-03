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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categoryDetails } from '@/lib/data';

export function SetBudgetDialog() {
  const expenseCategories = Object.keys(categoryDetails).filter(c => c !== 'Salary');

  return (
    <Dialog>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {expenseCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="limit" className="text-right">
              Limit
            </Label>
            <Input id="limit" type="number" placeholder="e.g., 500" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save budget</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
