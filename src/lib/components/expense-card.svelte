<script lang="ts">
	import type { Category } from '@prisma/client';
	import { categoryIcons } from '$lib/category';
	import { formatCents } from '$lib/currency';

	export let label: string | null;
	export let amount: number;
	export let category: Pick<Category, 'slug' | 'title'>;
</script>

<div class="flex items-center justify-between gap-x-3 py-3.5 pl-3 pr-4">
	<div class="flex items-center gap-x-3">
		<div class="flex h-12 w-12 items-center justify-center rounded-full bg-neutral">
			<svelte:component this={categoryIcons[category.slug]} />
		</div>

		<div class="overflow-hidden overflow-ellipsis whitespace-nowrap">{label ?? category.title}</div>
	</div>
	<div>{formatCents(amount * -1)}</div>
</div>
