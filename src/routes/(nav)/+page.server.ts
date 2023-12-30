import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/auth';
import type { ExpenseWithCategory } from '../api/expenses/+server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { fetch, locals } = event;

	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, handleLoginRedirect(event));
	}

	const expensesStream: Promise<ExpenseWithCategory[][]> = fetch('/api/expenses').then((res) =>
		res.json()
	);

	return {
		expensesStream
	};
};
