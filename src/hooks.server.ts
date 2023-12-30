import type { HandleServerError } from '@sveltejs/kit';
import { logger } from '$lib/server/logger';

export const handleError: HandleServerError = ({ status, error, message }) => {
	if (status !== 404) {
		logger.error(error);
	}

	return { message };
};
