<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Heading from '$lib/components/heading.svelte';

	function handleClickReload() {
		window.location.reload();
	}

	onMount(() => {
		// Listen to changes in the network state, reload when online.
		// This handles the case when the device is completely offline.
		window.addEventListener('online', () => {
			window.location.reload();
		});

		// Check if the server is responding and reload the page if it is.
		// This handles the case when the device is online, but the server
		// is offline or misbehaving.
		async function checkNetworkAndReload() {
			try {
				const response = await fetch('.');
				// Verify we get a valid response from the server
				if (response.status >= 200 && response.status < 500) {
					window.location.reload();
					return;
				}
			} catch {
				// Unable to connect to the server, ignore.
			}

			window.setTimeout(checkNetworkAndReload, 2500);
		}

		// do not reload if we visit the page explicitly
		if ($page.url.pathname !== '/offline') {
			checkNetworkAndReload();
		}
	});
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<Heading level="h1">Offline</Heading>

<button type="button" on:click={handleClickReload}>Reload</button>
