<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>E-Mail Preview</title>
</svelte:head>

<div class="mx-auto max-w-2xl px-4">
	<h1 class="mb-12 mt-16 text-3xl font-bold">Email Templates</h1>

	{#if data.templates.length > 0}
		<ul class="space-y-5">
			{#each data.templates as template}
				<li>
					<div class="flex items-center justify-between gap-x-4">
						<div class="flex shrink-0 items-center gap-x-2">
							<a href={template.path} class="whitespace-nowrap font-semibold">{template.key}</a>
							<a href={template.publicUrl} target="_blank" class="btn btn-xs">Public URL</a>
						</div>

						<div
							class="mt-1 inline-block min-w-0 max-w-full shrink overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm"
						>
							{template.path}
						</div>
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No templates found</p>
	{/if}
</div>
