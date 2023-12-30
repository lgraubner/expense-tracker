import { z } from 'zod';

export const newEntrySchema = z.object({
	amount: z.coerce.number().default(0),
	description: z
		.string()
		.trim()
		.transform((val) => {
			if (val === '') {
				return undefined;
			}

			return val;
		})
		.optional(),
	categorySlug: z.string().trim().min(2)
});
