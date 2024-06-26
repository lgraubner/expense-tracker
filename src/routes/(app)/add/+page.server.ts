import { BookingType } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import { newEntrySchema } from '$lib/schemas';
import { isAuthenticated } from '$lib/server/auth';
import { logger } from '$lib/server/logger';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await isAuthenticated(event);

	const categories = await prisma.category.findMany({
		select: {
			id: true,
			title: true,
			slug: true,
			_count: {
				select: {
					bookings: {
						where: {
							type: BookingType.EXPENSE
						}
					}
				}
			}
		},
		orderBy: [
			{
				bookings: {
					_count: 'desc'
				}
			},
			{ createdAt: 'asc' }
		]
	});

	return {
		categories
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			return fail(401);
		}

		const data = await request.formData();

		const form = newEntrySchema.safeParse({
			issuedOn: data.get('issuedOn'),
			amount: data.get('amount'),
			description: data.get('description'),
			categorySlug: data.get('categorySlug')
		});

		if (!form.success) {
			return fail(400, { error: 'Please choose a category' });
		}

		try {
			await prisma.booking.create({
				data: {
					amount: form.data.amount,
					description: form.data.description,
					issuedOn: form.data.issuedOn,
					type: BookingType.EXPENSE,
					category: {
						connect: {
							slug: form.data.categorySlug
						}
					},
					user: {
						connect: {
							id: session.user.userId
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
