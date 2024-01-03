<script lang="ts">
	import { enhance } from '$app/forms';
	import Heading from '$lib/components/heading.svelte';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="flex h-full flex-col px-4 pb-4 pt-16">
	<Heading level="h1">Settings</Heading>

	<div class="mt-8">
		<input type="text" class="input input-bordered w-full" value={data.email} disabled />
	</div>

	<form method="post" action="?/logout" use:enhance>
		<button type="submit" class="btn mt-6 w-full">Sign out</button>
	</form>
</div>
