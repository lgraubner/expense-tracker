import { fail, redirect } from '@sveltejs/kit';
import { newEntrySchema } from '$lib/schemas';
import { logger } from '$lib/server/logger';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const categories = await prisma.category.findMany({
		select: {
			id: true,
			title: true,
			slug: true
		}
	});

	return {
		categories
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const form = newEntrySchema.safeParse({
			amount: data.get('amount'),
			description: data.get('description'),
			categorySlug: data.get('categorySlug')
		});

		if (!form.success) {
			return fail(400, { error: 'Please choose a category' });
		}

		try {
			await prisma.expense.create({
				data: {
					amount: form.data.amount,
					description: form.data.description,
					category: {
						connect: {
							slug: form.data.categorySlug
						}
					}
				}
			});
		} catch (err: unknown) {
			logger.error(err);

			return fail(500, { error: 'Server error. Please try again later.' });
		}

		redirect(303, '/');
	}
} satisfies Actions;
