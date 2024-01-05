import { isBefore } from 'date-fns';
import { z } from 'zod';

export const newEntrySchema = z.object({
	issuedOn: z
		.string()
		.optional()
		.transform((val) => {
			if (val) {
				const date = new Date(val);

				// only use valid dates which are today or older
				if (!isNaN(date.getTime()) && isBefore(date, new Date())) {
					return date;
				}
			}
		}),
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
