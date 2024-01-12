import { error, redirect, type ServerLoadEvent } from '@sveltejs/kit';

export enum AuthRole {
	USER,
	ADMIN
}

export function handleLoginRedirect(url: URL) {
	const fromUrl = url.pathname + url.search;

	if (fromUrl === '/') {
		return '/login';
	}

	return `/login?continue=${encodeURIComponent(fromUrl)}`;
}

/**
 * Method for validating a valid session is active. Can only be used for
 * server side load functions.
 */
export async function isAuthenticated(event: ServerLoadEvent) {
	const session = await event.locals.auth.validate();

	if (!session) {
		redirect(302, handleLoginRedirect(event.url));
	}

	return session;
}

export async function isAdmin(event: ServerLoadEvent) {
	const session = await isAuthenticated(event);

	if (session.user.role === AuthRole.ADMIN) {
		return error(404);
	}

	return session;
}
