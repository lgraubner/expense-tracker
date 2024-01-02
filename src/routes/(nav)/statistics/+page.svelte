<script lang="ts">
	import Heading from '$lib/components/heading.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	const formatter = new Intl.NumberFormat('de-DE', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		style: 'currency',
		currency: 'EUR'
	});
</script>

<div class="px-4 pb-4 pt-16 h-full flex flex-col">
	<Heading level="h1">Statistics</Heading>

	{#if data.currentMonthTotal}
		<div class="stats">
			<div class="stat">
				<div class="stat-title mb-1">Monthly total</div>
				<div class="stat-value">{formatter.format(data.currentMonthTotal / 100)}</div>
			</div>
		</div>
	{:else}
		<p class="mt-8">No expenses yet</p>
	{/if}
</div>
