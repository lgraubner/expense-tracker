import { Prisma } from '@prisma/client';
import { json } from '@sveltejs/kit';
import { isSameDay } from 'date-fns';
import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

const expenseWithCategory = Prisma.validator<Prisma.ExpenseDefaultArgs>()({
	select: {
		description: true,
		amount: true,
		createdAt: true,
		category: {
			select: {
				title: true,
				slug: true
			}
		}
	}
});

export type ExpenseWithCategory = Prisma.ExpenseGetPayload<typeof expenseWithCategory>;

export const GET: RequestHandler = async () => {
	const expenses = await prisma.expense.findMany({
		select: expenseWithCategory.select,
		orderBy: {
			createdAt: 'desc'
		},
		take: 40
	});

	type ExpenseResult = typeof expenses;

	const groupedExpenses: ExpenseResult[] = [];
	let currentGroup: ExpenseResult = [];

	for (const expense of expenses) {
		// if current group is not empty and same day add to it
		if (currentGroup.length > 0 && isSameDay(currentGroup[0].createdAt, expense.createdAt)) {
			currentGroup.push(expense);
			continue;
		}

		// if current group is not empty push it
		if (currentGroup.length > 0) {
			groupedExpenses.push(currentGroup);
		}

		// create new group
		currentGroup = [expense];
	}

	if (currentGroup.length > 0) {
		groupedExpenses.push(currentGroup);
	}

	return json(groupedExpenses);
};
