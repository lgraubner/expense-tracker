import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { locals } = event;

	const session = await locals.auth.validate();

	if (!session) {
		redirect(302, handleLoginRedirect(event));
	}

	return {};
};
