import { error, type RequestHandler } from '@sveltejs/kit';
import type { ComponentType, SvelteComponent } from 'svelte';
import { dev } from '$app/environment';
import EmailVerification from '$lib/server/email/templates/email-verification.svelte';
import { generatePreviewToken, render } from '$lib/server/email/utils';

const templates: Record<
	string,
	{
		component: ComponentType<SvelteComponent>;
		data: Record<string, unknown>;
	}
> = {
	'email-verification': {
		component: EmailVerification,
		data: {
			title: 'Test',
			name: 'Lars'
		}
	}
};

function validateToken(templateName: string, url: URL) {
	const token = url.searchParams.get('token');

	if (!dev && token !== generatePreviewToken(templateName)) {
		error(404, 'Not Found');
	}
}

export const GET: RequestHandler = ({ params, url }) => {
	const templateName = params.template;

	if (!templateName) {
		error(404, 'Not Found');
	}

	validateToken(templateName, url);

	const template = templates[templateName];

	if (!template) {
		error(404, 'Not Found');
	}

	const email = render(template.component, template.data);

	return new Response(email.html, {
		headers: {
			'content-type': 'text/html'
		}
	});
};
