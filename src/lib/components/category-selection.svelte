<script lang="ts">
	import type { Category } from '@prisma/client';
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';
	import { categoryIcons } from '$lib/category';

	export let categories: Pick<Category, 'title' | 'slug'>[];

	let selectedCategory: string | null = null;

	const dispatch = createEventDispatcher<{ change: string }>();

	function handleClickCategory(slug: string) {
		selectedCategory = slug;

		dispatch('change', slug);
	}
</script>

<div class="grid-cols-grid grid grid-cols-3 gap-4">
	{#each categories as category}
		<button
			type="button"
			class={clsx(
				'flex aspect-[9/10] flex-col items-center justify-center gap-y-3 rounded-lg border-2 bg-base-200 px-2.5 font-medium',
				selectedCategory === category.slug ? 'border-primary' : 'border-base-200'
			)}
			on:click={() => handleClickCategory(category.slug)}
		>
			<svelte:component this={categoryIcons[category.slug]} size={36} strokeWidth={1.5} />
			<span class="text-sm">{category.title}</span>
		</button>
	{/each}
</div>
