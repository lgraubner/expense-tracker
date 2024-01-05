import { redirect } from '@sveltejs/kit';
import { startOfMonth } from 'date-fns';
import { handleLoginRedirect } from '$lib/auth';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;

	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, handleLoginRedirect(event));
	}

	const currentMonthTotal = await prisma.expense.aggregate({
		_sum: {
			amount: true
		},
		where: {
			issuedOn: {
				gte: startOfMonth(new Date())
			},
			userId: session.user.userId
		}
	});

	return {
		currentMonthTotal: currentMonthTotal._sum.amount
	};
};
