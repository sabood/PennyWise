export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: CategoryName;
};

export type CategoryName = 'Housing' | 'Food' | 'Transportation' | 'Utilities' | 'Entertainment' | 'Health' | 'Salary' | 'Other';

export type Category = {
  name: CategoryName;
  color: string;
}

export type Budget = {
  category: CategoryName;
  limit: number;
};
