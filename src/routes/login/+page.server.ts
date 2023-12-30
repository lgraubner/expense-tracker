import { fail, redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { message, superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/auth';
import { logger } from '$lib/server/logger';
import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	default: async ({ request, locals, url }) => {
		const form = await superValidate(request, loginSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email, password } = form.data;

			const key = await auth.useKey('email', email.toLowerCase(), password);

			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});

			locals.auth.setSession(session);

			logger.info(
				{
					usr: { id: form.data.email },
					evt: { category: 'authentication', name: 'email', outcome: 'success' },
					network: { client: { ip: request.headers.get('x-forwarded-for') || null } }
				},
				'successful login'
			);
		} catch (err: unknown) {
			if (
				err instanceof LuciaError &&
				(err.message === 'AUTH_INVALID_KEY_ID' || err.message === 'AUTH_INVALID_PASSWORD')
			) {
				logger.info(
					{
						usr: { id: form.data.email },
						evt: { category: 'authentication', name: 'email', outcome: 'failure' },
						network: { client: { ip: request.headers.get('x-forwarded-for') || null } }
					},
					'failed login attempt'
				);

				return message(form, 'You entered an incorrect email address or password');
			}

			logger.error(err);

			return message(form, 'An unknown error has occurred', {
				status: 500
			});
		}

		const returnTo = url.searchParams.get('return_to');

		if (returnTo) {
			// avoid malicious redirects
			redirect(307, `/${decodeURIComponent(returnTo).slice(1)}`);
		}

		redirect(307, '/');
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		// if (!session.user.emailVerifiedAt) {
		// 	redirect(307, '/email-verification');
		// }

		redirect(307, '/');
	}

	const form = await superValidate(loginSchema);

	return {
		form
	};
};
