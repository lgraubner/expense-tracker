<script lang="ts">
	import { PlusIcon } from 'lucide-svelte';
	import IllustrationStars from '$lib/assets/empty.svg';
	import DateHeadingSkeleton from '$lib/components/date-heading-skeleton.svelte';
	import DateHeading from '$lib/components/date-heading.svelte';
	import ExpenseCardSkeleton from '$lib/components/expense-card-skeleton.svelte';
	import ExpenseCard from '$lib/components/expense-card.svelte';
	import Heading from '$lib/components/heading.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Expense Tracker</title>
</svelte:head>

<div class="flex h-full flex-col overflow-auto px-4 pb-24 pt-16">
	<Heading level="h1">Expenses</Heading>

	{#await data.expensesStream}
		<div class="mt-6 space-y-3">
			<DateHeadingSkeleton />
			<div class="join join-vertical w-full">
				<ExpenseCardSkeleton />
				<ExpenseCardSkeleton />
			</div>
		</div>
	{:then expenses}
		{#if expenses.length > 0}
			<div class="mt-6 space-y-6">
				{#each expenses as group}
					<div class="space-y-3">
						<DateHeading date={group[0].issuedOn} />
						<div
							class="join join-vertical w-full divide-y divide-neutral rounded-lg border border-neutral"
						>
							{#each group as expense}
								<ExpenseCard
									label={expense.description}
									amount={expense.amount}
									category={expense.category}
								/>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="flex w-full grow items-center justify-center pb-16">
				<div class="flex flex-col items-center">
					<img src={IllustrationStars} alt="" width={140} />
					<p class="mb-8 mt-14 text-2xl font-medium">Nothing here yet</p>

					<a href="/add" class="text-md btn btn-sm">Add expense</a>
				</div>
			</div>
		{/if}
	{/await}
</div>

<div class="pb-safe fixed bottom-20 right-4">
	<a href="/add" class="btn btn-circle btn-primary btn-lg" aria-label="Add expense"
		><PlusIcon size={24} /></a
	>
</div>
