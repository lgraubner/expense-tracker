import { prisma } from '@lucia-auth/adapter-prisma';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import client from '$lib/server/prisma';
import { AuthRole } from './auth';

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
			emailVerifiedAt: data.emailVerifiedAt,
			role: data.email === 'mail@larsgraubner.de' ? AuthRole.ADMIN : AuthRole.USER
		};
	}
});

export type Auth = typeof auth;
