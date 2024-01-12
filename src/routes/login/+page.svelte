<script lang="ts">
	import clsx from 'clsx';
	import { superForm } from 'sveltekit-superforms/client';
	import { loginSchema } from '$lib/auth';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		validators: loginSchema,
		validationMethod: 'submit-only',
		taintedMessage: false
	});
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex h-full items-center justify-center px-4">
	<div class="max-w-sm grow pb-32">
		<h1 class="mb-6 text-3xl font-bold">Login</h1>
		<form method="post" use:enhance novalidate>
			{#if $message}<p class="mb- text-red-500">{$message}</p>{/if}

			<div class="form-control w-full">
				<label class="label" for="identifier"><span class="label-text">Email</span></label>
				<input
					type="email"
					name="identifier"
					id="identifier"
					autocomplete="username"
					spellcheck="false"
					autocapitalize="off"
					class={clsx('input input-bordered w-full', {
						'input-error': $errors.identifier
					})}
					aria-invalid={$errors.identifier ? 'true' : undefined}
					bind:value={$form.identifier}
				/>
				{#if $errors.identifier}
					<p class="text-red-500">{$errors.identifier}</p>
				{/if}
			</div>
			<div class="form-control w-full">
				<label class="label" for="passwd"><span class="label-text">Password</span></label>
				<input
					type="password"
					name="passwd"
					id="passwd"
					autocomplete="current-password"
					spellcheck="false"
					autocapitalize="off"
					class={clsx('input input-bordered w-full', {
						'input-error': $errors.passwd
					})}
					aria-invalid={$errors.passwd ? 'true' : undefined}
					bind:value={$form.passwd}
				/>
				{#if $errors.passwd}
					<p class="text-red-500">{$errors.passwd}</p>
				{/if}

				<p class="mt-2 hidden text-right">
					<a href="/password-reset" class="link">Forgot your password?</a>
				</p>
			</div>
			<button type="submit" class="btn btn-primary btn-block mt-8"
				>{#if $delayed}<span class="loading loading-spinner" />{:else}Login{/if}</button
			>
		</form>
		<p class="mt-10">No account yet? <a href="/signup" class="link">Sign up</a></p>
	</div>
</div>
