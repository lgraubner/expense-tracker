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

<div class="gap-4 grid grid-cols-grid grid-cols-3">
	{#each categories as category}
		<button
			type="button"
			class={clsx(
				'flex flex-col items-center justify-center gap-y-3 rounded-lg border-2 px-2.5 font-medium bg-neutral aspect-[9/10]',
				selectedCategory === category.slug ? 'border-primary' : 'border-neutral'
			)}
			on:click={() => handleClickCategory(category.slug)}
		>
			<svelte:component this={categoryIcons[category.slug]} size={36} strokeWidth={1.5} />
			<span class="text-sm">{category.title}</span>
		</button>
	{/each}
</div>
