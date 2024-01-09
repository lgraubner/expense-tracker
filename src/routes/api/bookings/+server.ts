import { Prisma } from '@prisma/client';
import { error, json } from '@sveltejs/kit';
import { isSameDay } from 'date-fns';
import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

const bookingWithCategory = Prisma.validator<Prisma.BookingDefaultArgs>()({
	select: {
		description: true,
		amount: true,
		issuedOn: true,
		type: true,
		category: {
			select: {
				title: true,
				slug: true
			}
		}
	}
});

export type BookingWithCategory = Prisma.BookingGetPayload<typeof bookingWithCategory>;

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		return error(401);
	}

	const bookings = await prisma.booking.findMany({
		select: bookingWithCategory.select,
		where: {
			userId: session.user.userId
		},
		orderBy: [
			{
				issuedOn: 'desc'
			},
			{ createdAt: 'desc' }
		],
		take: 40
	});

	type BookingsResult = typeof bookings;

	const groupedBookings: BookingsResult[] = [];
	let currentGroup: BookingsResult = [];

	for (const booking of bookings) {
		// if current group is not empty and same day add to it
		if (currentGroup.length > 0 && isSameDay(currentGroup[0].issuedOn, booking.issuedOn)) {
			currentGroup.push(booking);
			continue;
		}

		// if current group is not empty push it
		if (currentGroup.length > 0) {
			groupedBookings.push(currentGroup);
		}

		// create new group
		currentGroup = [booking];
	}

	if (currentGroup.length > 0) {
		groupedBookings.push(currentGroup);
	}

	return json(groupedBookings);
};
