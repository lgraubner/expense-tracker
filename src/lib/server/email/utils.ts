import { convert } from 'html-to-text';
import mjml2html from 'mjml';
import postmark from 'postmark';
import type { ComponentType, SvelteComponent } from 'svelte';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';
import { logger } from '$lib/server/logger';

/**
 * When sending emails with the format "Name <mail@example.com>" in the
 * "To" field, the name part should not contain certain characters.
 */
function sanitizeEmailDisplayName(name: string) {
	return name.replace(/[^a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~ ]/g, '');
}

export function formatNameAdress(name: string, email: string) {
	return `${sanitizeEmailDisplayName(name)} <${email}>`;
}

/**
 *  Warning: It's not possible to correctly infer Svelte component props here.
 *  Make sure to pass all required props as second argument.
 */
export function render<Component extends SvelteComponent>(
	template: ComponentType<Component>,
	props?: Record<string, unknown>
) {
	const { html: _template } = (template as unknown as Component).render(props);

	// mjml doesn't like data-svelte-h attributes and those can be safely
	// removed
	const sanitizedTemplate = _template.replace(/\s?data-svelte-h="[a-z0-9-]+"/, '');

	const { errors, html } = mjml2html(sanitizedTemplate);

	if (Array.isArray(errors) && errors.length > 0) {
		const errorMessages = errors.map((error) => error.formattedMessage);

		throw new Error(errorMessages.join('\n'));
	}

	// automatically create text only version
	const text = convert(html, {
		selectors: [{ selector: 'img', format: 'skip' }]
	});

	return { html, text };
}

let client: postmark.ServerClient;

export function sendEmail(
	email: Pick<Partial<postmark.Models.Message>, 'From'> & Omit<postmark.Models.Message, 'From'>,
	{ html, text }: { html?: string; text: string }
) {
	if (!env.POSTMARK_SERVER_API_TOKEN) {
		if (dev) {
			logger.debug(text);
			return;
		}

		throw new Error('Could not send email, POSTMARK_SERVER_API_TOKEN is not set.');
	}

	if (!client) {
		client = new postmark.ServerClient(env.POSTMARK_SERVER_API_TOKEN);
	}

	return client.sendEmail({
		...email,
		From: email.From || 'PV <info@example.de>',
		HtmlBody: html,
		TextBody: text
	});
}

export function generatePreviewToken(templateName: string) {
	return Buffer.from(templateName + env.EMAIL_PREVIEW_SECRET).toString('base64url');
}
