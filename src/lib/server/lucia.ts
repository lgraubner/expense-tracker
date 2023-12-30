import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import client from '$lib/server/prisma';

export const auth = lucia({
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	adapter: prisma(client, {
		user: 'user',
		key: 'authKey',
		session: 'session'
	}),
	getUserAttributes(data) {
		return {
			email: data.email,
			emailVerifiedAt: data.emailVerifiedAt
		};
	}
});

export type Auth = typeof auth;
