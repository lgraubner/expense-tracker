<script lang="ts">
	import type { Category } from '@prisma/client';
	import { categoryIcons } from '$lib/category';

	export let label: string | null;
	export let amount: number;
	export let category: Pick<Category, 'slug' | 'title'>;

	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	});
</script>

<div class="pl-3 py-3.5 pr-4 flex items-center justify-between gap-x-3">
	<div class="flex items-center gap-x-3">
		<div class="w-12 h-12 rounded-full bg-neutral flex items-center justify-center">
			<svelte:component this={categoryIcons[category.slug]} />
		</div>

		<div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{label ?? category.title}</div>
	</div>
	<div>{formatter.format(amount / -100)}</div>
</div>
