<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	$: ({ prevPage, nextPage } = data);
</script>

<ul>
	{#each data.categories as category}
		<li>{category.title}</li>
	{/each}
</ul>

{#if prevPage}
	<a href={`/admin?page=${prevPage}`}>Prev</a>
{/if}
{#if nextPage}
	<a href={`/admin?page=${nextPage}`}>Next</a>
{/if}
