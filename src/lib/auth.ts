import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';

export const loginSchema = z.object({
	identifier: z.string().email('Invalid email address').toLowerCase(),
	passwd: z.string().min(8, 'Must not be empty').max(255, 'Password too long')
});

export function handleLoginRedirect(event: RequestEvent) {
	const fromUrl = event.url.pathname + event.url.search;

	if (fromUrl === '/') {
		return '/login';
	}

	return `/login?return_to=${encodeURIComponent(fromUrl)}`;
}

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
