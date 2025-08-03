
'use server';

import { generateBudgetAdjustments, GenerateBudgetAdjustmentsInput } from '@/ai/flows/generate-budget-adjustments';

export async function getAISuggestions(input: GenerateBudgetAdjustmentsInput) {
  try {
    const { suggestions } = await generateBudgetAdjustments(input);
    return { success: true, suggestions };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
