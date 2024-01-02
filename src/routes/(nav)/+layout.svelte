<script lang="ts">
	import { BarChartIcon, HomeIcon, UserIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	async function detectSWUpdate() {
		if (!browser) {
			return;
		}

		const registration = await navigator.serviceWorker.ready;

		registration.addEventListener('updatefound', () => {
			const newSW = registration.installing;

			newSW?.addEventListener('statechange', () => {
				if (newSW.state === 'installed') {
					if (confirm('New update available! Reload to update?')) {
						newSW.postMessage({ type: 'SKIP_WAITING' });
						window.location.reload();
					}
				}
			});
		});
	}

	onMount(() => {
		detectSWUpdate();
	});
</script>

<main class="h-full pb-16">
	<slot />
</main>

<nav class="btm-nav box-content">
	<a href="/" class:active={$page.url.pathname === '/'} aria-label="Home">
		<HomeIcon />
	</a>
	<a href="/statistics" class:active={$page.url.pathname === '/statistics'} aria-label="Statistics">
		<BarChartIcon />
	</a>
	<a href="/settings" class:active={$page.url.pathname === '/settings'} aria-label="Settings">
		<UserIcon />
	</a>
</nav>
