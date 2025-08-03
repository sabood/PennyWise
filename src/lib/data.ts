import type { Transaction, Budget, CategoryName, Category } from '@/types';
import {
  Home,
  Utensils,
  Car,
  Lightbulb,
  Ticket,
  HeartPulse,
  Briefcase,
  MoreHorizontal,
} from 'lucide-react';

export const transactions: Transaction[] = [
  { id: '1', date: '2024-07-15', description: 'Monthly Salary', amount: 5000, type: 'income', category: 'Salary' },
  { id: '2', date: '2024-07-15', description: 'Rent Payment', amount: 1500, type: 'expense', category: 'Housing' },
  { id: '3', date: '2024-07-16', description: 'Groceries', amount: 250, type: 'expense', category: 'Food' },
  { id: '4', date: '2024-07-17', description: 'Gasoline', amount: 60, type: 'expense', category: 'Transportation' },
  { id: '5', date: '2024-07-18', description: 'Electricity Bill', amount: 120, type: 'expense', category: 'Utilities' },
  { id: '6', date: '2024-07-19', description: 'Movie Tickets', amount: 45, type: 'expense', category: 'Entertainment' },
  { id: '7', date: '2024-07-20', description: 'Dinner with friends', amount: 80, type: 'expense', category: 'Food' },
  { id: '8', date: '2024-07-21', description: 'Pharmacy', amount: 30, type: 'expense', category: 'Health' },
  { id: '9', date: '2024-07-22', description: 'Public Transport Pass', amount: 75, type: 'expense', category: 'Transportation' },
  { id: '10', date: '2024-07-23', description: 'Internet Bill', amount: 60, type: 'expense', category: 'Utilities' },
];

export const budgets: Budget[] = [
  { category: 'Food', limit: 500 },
  { category: 'Transportation', limit: 200 },
  { category: 'Entertainment', limit: 150 },
  { category: 'Utilities', limit: 300 },
];

export const categoryDetails: Record<CategoryName, { icon: React.ElementType; color: string }> = {
  'Housing': { icon: Home, color: 'hsl(var(--chart-1))' },
  'Food': { icon: Utensils, color: 'hsl(var(--chart-2))' },
  'Transportation': { icon: Car, color: 'hsl(var(--chart-3))' },
  'Utilities': { icon: Lightbulb, color: 'hsl(var(--chart-4))' },
  'Entertainment': { icon: Ticket, color: 'hsl(var(--chart-5))' },
  'Health': { icon: HeartPulse, color: 'hsl(349, 83%, 63%)' },
  'Salary': { icon: Briefcase, color: 'hsl(142, 71%, 45%)' },
  'Other': { icon: MoreHorizontal, color: 'hsl(217, 33%, 17%)' },
};
