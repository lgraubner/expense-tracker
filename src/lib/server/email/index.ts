import EmailVerification from './templates/email-verification.svelte';
import { formatNameAdress, render, sendEmail } from './utils';

export async function sendEmailVerificationEmail(data: {
	title: string;
	email: string;
	name: string;
}) {
	const { title, name, email } = data;

	const _email = render(EmailVerification, { title, name, email });

	return sendEmail({ To: formatNameAdress(name, email), Subject: 'Test' }, _email);
}
