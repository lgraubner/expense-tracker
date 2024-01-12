import { isBefore } from 'date-fns';
import { z } from 'zod';

export const loginSchema = z.object({
	identifier: z.string().email('Invalid email address').toLowerCase(),
	passwd: z.string().min(8, 'Must not be empty').max(255, 'Password too long')
});

export const signupSchema = z.object({
	email: z.string().email('Valid email address required').toLowerCase(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(255, 'Password too long')
});

export const requestPasswordResetSchema = z.object({
	email: z.string().email('Valid email address required')
});

export const passwordResetSchema = z.object({
	password: z.string().min(8, 'Must not be empty').max(255, 'Password too long')
});

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
