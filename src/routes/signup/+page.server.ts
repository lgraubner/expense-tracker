import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { signupSchema } from '$lib/schemas';
import { logger } from '$lib/server/logger';
import { auth } from '$lib/server/lucia';
import type { Actions, PageServerLoad } from './$types';

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, signupSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const { email, password } = form.data;

			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password
				},
				attributes: {
					email,
					emailVerifiedAt: null
				}
			});

			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);

			logger.info(
				{
					usr: { id: form.data.email },
					evt: { category: 'signup', name: 'email', outcome: 'success' },
					network: { client: { ip: request.headers.get('x-forwarded-for') || null } }
				},
				'successful registration'
			);
		} catch (err: unknown) {
			if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
				// email is already registered

				logger.info(
					{
						usr: { id: form.data.email },
						evt: { category: 'signup', name: 'duplicate email', outcome: 'failure' },
						network: { client: { ip: request.headers.get('x-forwarded-for') || null } }
					},
					'signup failed with duplicate email'
				);

				return setError(form, 'email', 'Email address already exists');
			}

			logger.error(err);

			return fail(500, {
				message: 'An unknown error has occurred'
			});
		}

		redirect(307, '/');
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();

	if (session) {
		redirect(307, '/');
	}

	const form = await superValidate(signupSchema);

	return {
		form
	};
};
