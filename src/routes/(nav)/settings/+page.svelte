<script>
	import { enhance } from '$app/forms';
	import Heading from '$lib/components/heading.svelte';
</script>

<div class="px-4 pb-4 pt-16 h-full flex flex-col">
	<Heading level="h1">Settings</Heading>

	<form method="post" action="?/logout" use:enhance>
		<button type="submit" class="btn mt-16 w-full">Sign out</button>
	</form>
</div>
