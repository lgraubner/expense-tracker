import { BookingType } from '@prisma/client';
import { startOfMonth } from 'date-fns';
import { isAuthenticated } from '$lib/server/auth';
import prisma from '$lib/server/prisma';
import type { BookingWithCategory } from '../../api/bookings/+server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { fetch } = event;

	const session = await isAuthenticated(event);

	async function getGroupedBookings(): Promise<BookingWithCategory[][]> {
		const res = await fetch('/api/bookings');

		return res.json();
	}

	const [currentMonthTotal, bookings] = await Promise.all([
		prisma.booking.aggregate({
			_sum: {
				amount: true
			},
			where: {
				type: BookingType.EXPENSE,
				issuedOn: {
					gte: startOfMonth(new Date())
				},
				userId: session.user.userId
			}
		}),
		getGroupedBookings()
	]);

	return {
		bookings,
		currentMonthTotal: currentMonthTotal._sum.amount
	};
};
