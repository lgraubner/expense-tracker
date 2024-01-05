<script lang="ts">
	import { XIcon } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;

	const dispatch = createEventDispatcher();

	function handleClickClose() {
		dispatch('close');
	}
</script>

<header
	class="fixed left-0 top-0 flex h-16 w-full items-center justify-center border-b border-base-200 bg-base-100"
>
	<h1 class="text-lg font-semibold">{title}</h1>
	<button
		type="button"
		on:click={handleClickClose}
		class="btn btn-circle btn-ghost absolute right-2 top-2"><XIcon /></button
	>
</header>
