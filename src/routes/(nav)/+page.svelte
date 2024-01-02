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

<div class="px-4 pb-24 pt-16 h-full flex flex-col overflow-auto">
	<Heading level="h1">This month</Heading>

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
						<DateHeading date={group[0].createdAt} />
						<div
							class="join join-vertical w-full rounded-lg border border-neutral divide-y divide-neutral"
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
			<div class="w-full flex items-center justify-center grow pb-16">
				<div class="items-center flex flex-col">
					<img src={IllustrationStars} alt="" width={140} />
					<p class="mt-14 mb-8 text-2xl font-medium">Nothing here yet</p>

					<a href="/add" class="btn btn-sm text-md">Add expense</a>
				</div>
			</div>
		{/if}
	{/await}
</div>

<div class="fixed bottom-20 right-4 pb-safe">
	<a href="/add" class="btn btn-circle btn-lg btn-primary" aria-label="Add expense"
		><PlusIcon size={24} /></a
	>
</div>
