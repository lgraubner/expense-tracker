<script lang="ts">
	import { BarChartIcon, HomeIcon, UserIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<main class="h-full pb-16">
	<slot />
</main>

<nav class="btm-nav box-content">
	<a href="/" class:active={$page.url.pathname === '/'} aria-label="Home">
		<HomeIcon />
	</a>
	<a href="/analysis" class:active={$page.url.pathname === '/analysis'} aria-label="Analysis">
		<BarChartIcon />
	</a>
	<a href="/settings" class:active={$page.url.pathname === '/settings'} aria-label="Settings">
		<UserIcon />
	</a>
</nav>
