<script lang="ts">
	import { formatISO } from 'date-fns';
	import { CalendarIcon } from 'lucide-svelte';
	import type { ComponentEvents } from 'svelte';
	import { enhance } from '$app/forms';
	import CategorySelection from '$lib/components/category-selection.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;

	let page: 'amount' | 'category' = 'amount';

	let maxDate = formatISO(new Date(), { representation: 'date' });
	let issuedOn: string | undefined;
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

	function handleChangeDate(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		issuedOn = event.currentTarget.value;
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

<main class="h-full px-4 pb-4 pt-16">
	<PageHeader title="New expense" on:close={handleClickClose} />

	<div class="flex h-full flex-col">
		{#if page === 'amount'}
			<div class="mt-8 flex items-center justify-center">
				<div class="relative">
					<input
						type="date"
						name="issuedOn"
						value={maxDate}
						max={maxDate}
						class="text-md input w-40 pr-8 text-center font-medium leading-none"
						on:change={handleChangeDate}
					/>
					<CalendarIcon
						class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
						size={16}
					/>
				</div>
			</div>

			<div class="flex grow flex-col items-center justify-center pb-24">
				<div class="relative">
					{#if amountError}
						<div
							class="text-md absolute -top-10 left-1/2 w-full max-w-xs -translate-x-1/2 text-center text-error"
						>
							{amountError}
						</div>
					{/if}

					<div class="text-center text-5xl font-semibold tabular-nums">
						<input
							type="text"
							name="amount"
							class="w-full appearance-none bg-transparent pr-11 text-center tabular-nums focus:outline-none"
							inputmode="numeric"
							on:keydown={handleAmountKeydown}
							bind:value={formattedAmount}
						/>
						<div
							class="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
						>
							<span class="invisible">{formattedAmount}</span><span
								class="w-11 shrink-0 whitespace-nowrap text-left">&nbsp;€</span
							>
						</div>
					</div>
				</div>

				<input
					type="text"
					name="description"
					class="input mt-8 w-full text-center"
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
				<input type="hidden" name="issuedOn" bind:value={issuedOn} />
				<input type="hidden" name="amount" bind:value={amount} />
				<input type="hidden" name="description" bind:value={description} />

				<div class="flex min-h-0 shrink grow flex-col pt-8">
					{#if form?.error}
						<div class="text-md mb-4 text-center text-error">
							{form.error}
						</div>
					{/if}

					<div class="min-h-0 shrink overflow-auto">
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
