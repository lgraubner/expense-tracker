<script>
	import { BarChartIcon, HomeIcon, UserIcon } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<main class="h-dvh pb-16">
	<slot />
</main>

<nav class="btm-nav">
	<a href="/" class:active={$page.url.pathname === '/'}>
		<HomeIcon />
	</a>
	<a href="/statistics" class:active={$page.url.pathname === '/statistics'}>
		<BarChartIcon />
	</a>
	<a href="/settings" class:active={$page.url.pathname === '/settings'}>
		<UserIcon />
	</a>
</nav>
