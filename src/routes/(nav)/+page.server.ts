import { redirect } from '@sveltejs/kit';
import { startOfMonth } from 'date-fns';
import { handleLoginRedirect } from '$lib/auth';
import prisma from '$lib/server/prisma';
import type { ExpenseWithCategory } from '../api/expenses/+server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { fetch, locals } = event;

	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, handleLoginRedirect(event));
	}

	async function getGroupedExpenses(): Promise<ExpenseWithCategory[][]> {
		const res = await fetch('/api/expenses');

		return res.json();
	}

	const [currentMonthTotal, expenses] = await Promise.all([
		prisma.expense.aggregate({
			_sum: {
				amount: true
			},
			where: {
				issuedOn: {
					gte: startOfMonth(new Date())
				},
				userId: session.user.userId
			}
		}),
		getGroupedExpenses()
	]);

	return {
		expenses,
		currentMonthTotal: currentMonthTotal._sum.amount
	};
};
