import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, '/login');
	}

	return {
		userId: session.user.userId,
		email: session.user.email
	};
};

export const actions: Actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();

		if (!session) {
			return fail(401);
		}

		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);

		redirect(302, '/login');
	}
};
