<script lang="ts">
	import clsx from 'clsx';
	import { superForm } from 'sveltekit-superforms/client';
	import { signupSchema } from '$lib/auth';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, enhance, delayed } = superForm(data.form, {
		customValidity: true,
		validators: signupSchema,
		validationMethod: 'submit-only',
		taintedMessage: false
	});
</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<div class="flex h-full items-center justify-center px-4">
	<div class="max-w-sm grow pb-32">
		<h1 class="mb-6 text-3xl font-bold">Sign up</h1>
		<form method="post" novalidate use:enhance>
			<div class="form-control w-full">
				<label class="label" for="email"><span class="label-text">Email</span></label>
				<input
					type="email"
					name="email"
					id="email"
					class={clsx('input input-bordered w-full', {
						'input-error': $errors.email
					})}
					aria-invalid={$errors.email ? 'true' : undefined}
					bind:value={$form.email}
				/>
				{#if $errors.email}
					<p class="text-red-500">{$errors.email}</p>
				{/if}
			</div>
			<div class="form-control w-full">
				<label class="label" for="password"><span class="label-text">Password</span></label>
				<input
					type="password"
					name="password"
					id="password"
					class={clsx('input input-bordered w-full', {
						'input-error': $errors.password
					})}
					aria-invalid={$errors.password ? 'true' : undefined}
					bind:value={$form.password}
				/>
				{#if $errors.password}
					<p class="text-red-500">{$errors.password}</p>
				{/if}
			</div>

			<button type="submit" class="btn btn-primary btn-block mt-8"
				>{#if $delayed}<span class="loading loading-spinner" />{:else}Sign up{/if}</button
			>
			<p class="mt-4 text-sm">
				By registering, you agree to the <a href="/" class="link">Terms and Conditions</a> and
				<a href="/" class="link">Privacy Policy</a>.
			</p>
		</form>
		<p class="mt-10">Already have an account? <a href="/login" class="link">Log in</a></p>
	</div>
</div>
