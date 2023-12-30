import type { ExpenseWithCategory } from '../api/expenses/+server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const expensesStream: Promise<ExpenseWithCategory[][]> = fetch('/api/expenses').then((res) =>
		res.json()
	);

	return {
		expensesStream
	};
};
