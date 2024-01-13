import { error } from '@sveltejs/kit';
import { PUBLIC_APP_URL } from '$env/static/public';
import { dev } from '$app/environment';
import { generatePreviewToken } from '$lib/server/email/utils';
import type { PageServerLoad } from './$types';

function basename(path: string, ext = '.svelte') {
	const parts = path.split('/');

	return parts[parts.length - 1].replace(ext, '');
}

export const load: PageServerLoad = async () => {
	if (!dev) {
		throw error(404);
	}

	const files = import.meta.glob('$lib/server/email/templates/*.svelte');

	const templates = Object.keys(files).map((path) => {
		const key = basename(path);

		const url = new URL(`/_/email_preview/${key}`, PUBLIC_APP_URL);
		url.searchParams.set('token', generatePreviewToken(key));

		return {
			key,
			path: `/_/email-preview/${key}`,
			publicUrl: url.toString()
		};
	});

	return {
		templates
	};
};
