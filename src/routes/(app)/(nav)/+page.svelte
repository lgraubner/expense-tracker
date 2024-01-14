<script lang="ts">
	import { PlusIcon } from 'lucide-svelte';
	import IllustrationStars from '$lib/assets/empty.svg';
	import BookingCard from '$lib/components/booking-card.svelte';
	import DateHeading from '$lib/components/date-heading.svelte';
	import Heading from '$lib/components/heading.svelte';
	import { formatCents } from '$lib/currency';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Expense Tracker</title>
</svelte:head>

<div class="flex h-full flex-col overflow-auto px-4 pb-24 pt-10">
	<Heading level="h1">Overview</Heading>
	{#if data.currentMonthTotal}
		<div class="stats shrink-0 bg-base-200 shadow">
			<div class="stat">
				<div class="stat-title">Expenses this month</div>
				<div class="stat-value">{formatCents(data.currentMonthTotal)}</div>
			</div>
		</div>
	{/if}

	{#if data.bookings.length > 0}
		<div class="mt-6 space-y-6">
			{#each data.bookings as group}
				<div class="space-y-3">
					<DateHeading date={group[0].issuedOn} />
					<div
						class="join join-vertical w-full divide-y divide-neutral rounded-lg border border-neutral"
					>
						{#each group as booking}
							<BookingCard
								label={booking.description}
								amount={booking.amount}
								type={booking.type}
								category={booking.category}
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
</div>

<div class="pb-safe fixed bottom-20 right-4">
	<a href="/add" class="btn btn-circle btn-primary btn-lg" aria-label="Add expense"
		><PlusIcon size={24} /></a
	>
</div>
