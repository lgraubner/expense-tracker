<script lang="ts">
	import { XIcon } from 'lucide-svelte';
	import type { ComponentEvents } from 'svelte';
	import { enhance } from '$app/forms';
	import CategorySelection from '$lib/components/category-selection.svelte';
	import Heading from '$lib/components/heading.svelte';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;

	let page: 'amount' | 'category' = 'amount';
	let amount = 0;
	let description: string | null;
	let selectedCategorySlug: string | null = null;

	let amountError: string | null = null;

	$: formattedAmount = formatAmount(amount);

	$: if (selectedCategorySlug) {
		form = null;
	}

	const formatter = new Intl.NumberFormat('de-DE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});

	function formatAmount(amount: number) {
		return formatter.format(amount / 100);
	}

	function handleClickClose() {
		history.back();
	}

	function handleAmountKeydown(event: KeyboardEvent) {
		const intValue = parseInt(event.key, 10);

		const isPrintableKey = event.key.length === 1;

		if (isPrintableKey) {
			event.preventDefault();
		}

		if (isFinite(intValue) && event.key !== ' ') {
			if (amount < 999999) {
				amount = amount * 10 + intValue;
				amountError = null;
			}
		}

		if (event.key === 'Backspace') {
			event.preventDefault();

			amount = Math.floor(amount / 10);
			amountError = null;
		}

		if (event.key === 'Enter') {
			handleClickContinue();
		}
	}

	function handleDescriptionKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleClickContinue();
		}
	}

	function handleClickContinue() {
		if (amount === 0) {
			amountError = 'Please specify an amount';
			return;
		}

		page = 'category';
	}

	function handleChangeCategory(categorySlug: ComponentEvents<CategorySelection>['change']) {
		selectedCategorySlug = categorySlug.detail;
	}
</script>

<svelte:head>
	<title>New expense</title>
</svelte:head>

<main class="h-full pt-16 px-4 pb-4">
	<button
		type="button"
		on:click={handleClickClose}
		class="fixed top-2 right-2 btn btn-circle btn-ghost"><XIcon /></button
	>
	<div class="flex flex-col h-full">
		{#if page === 'amount'}
			<Heading level="h1">New expense</Heading>

			<div class="grow flex flex-col justify-center items-center pb-24">
				<div class="relative">
					{#if amountError}
						<div
							class="absolute -top-10 text-error left-1/2 -translate-x-1/2 w-full max-w-xs text-center text-md"
						>
							{amountError}
						</div>
					{/if}

					<div class="font-semibold tabular-nums text-5xl text-center">
						<input
							type="text"
							class="appearance-none bg-transparent w-full focus:outline-none pr-11 text-center tabular-nums"
							inputmode="numeric"
							on:keydown={handleAmountKeydown}
							bind:value={formattedAmount}
						/>
						<div
							class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
						>
							<span class="invisible">{formattedAmount}</span><span
								class="whitespace-nowrap w-11 shrink-0 text-left">&nbsp;€</span
							>
						</div>
					</div>
				</div>

				<input
					type="text"
					class="input w-full text-center mt-8"
					bind:value={description}
					placeholder="Description"
					on:keydown={handleDescriptionKeydown}
				/>
			</div>

			<button type="button" class="btn btn-primary w-full" on:click={handleClickContinue}
				>Continue</button
			>
		{/if}

		{#if page === 'category'}
			<form class="contents" method="post" use:enhance>
				<input type="hidden" name="amount" bind:value={amount} />
				<input type="hidden" name="description" bind:value={description} />

				<div class="grow flex flex-col shrink min-h-0">
					<Heading level="h2">Category</Heading>

					{#if form?.error}
						<div class="text-error text-md mt-4">
							{form.error}
						</div>
					{/if}

					<div class="shrink overflow-auto min-h-0 mt-4">
						<input type="hidden" name="categorySlug" bind:value={selectedCategorySlug} />

						<CategorySelection categories={data.categories} on:change={handleChangeCategory} />
					</div>
				</div>
				<div class="mt-6">
					<button type="submit" class="btn btn-primary w-full">Done</button>
				</div>
			</form>
		{/if}
	</div>
</main>
