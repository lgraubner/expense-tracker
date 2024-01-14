import { isAdmin } from '$lib/server/auth';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	await isAdmin(event);

	const { url } = event;

	const rawPage = url.searchParams.get('page');

	const parsedPage = Number(rawPage);
	const effectivePage = !isNaN(parsedPage) ? Math.max(parsedPage, 1) : 1;

	const itemsPerPage = 5;

	const [total, categories] = await Promise.all([
		prisma.category.count(),
		prisma.category.findMany({
			take: itemsPerPage,
			skip: (effectivePage - 1) * itemsPerPage
		})
	]);

	const totalPages = Math.ceil(total / itemsPerPage);
	const prevPage = effectivePage === 0 ? null : effectivePage - 1;
	const nextPage = effectivePage + 1 > totalPages ? null : effectivePage + 1;

	return {
		categories,
		total,
		prevPage,
		nextPage
	};
};
