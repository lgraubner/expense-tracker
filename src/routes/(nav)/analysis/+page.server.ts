import { isAuthenticated } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await isAuthenticated(event);

	return {
		email: session.user.email
	};
};
