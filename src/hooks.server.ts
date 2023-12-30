import type { Handle, HandleServerError } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';
import { auth } from '$lib/server/lucia';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	return await resolve(event);
};

export const handleError: HandleServerError = ({ status, error, message }) => {
	if (status !== 404) {
		logger.error(error);
	}

	return { message };
};
