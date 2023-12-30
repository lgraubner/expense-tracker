import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categories = [
	{
		title: 'Car',
		slug: 'car'
	},
	{
		title: 'Clothes',
		slug: 'clothes'
	},
	{
		title: 'Eating out',
		slug: 'eating-out'
	},
	{
		title: 'Entertainment',
		slug: 'entertainment'
	},
	{
		title: 'Food',
		slug: 'food'
	},
	{
		title: 'Gifts',
		slug: 'gifts'
	},
	{
		title: 'Health',
		slug: 'health'
	},
	{
		title: 'Living',
		slug: 'living'
	},
	{
		title: 'Pets',
		slug: 'pets'
	},
	{
		title: 'Sports',
		slug: 'sports'
	},
	{
		title: 'Toiletry',
		slug: 'toiletry'
	},
	{
		title: 'Transport',
		slug: 'transport'
	},
	{
		title: 'Misc',
		slug: 'misc'
	}
];

async function main() {
	for (const category of categories) {
		await prisma.category.upsert({
			where: {
				slug: category.slug
			},
			create: category,
			update: category
		});
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
