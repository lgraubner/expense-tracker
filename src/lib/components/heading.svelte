<script lang="ts">
	export let level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
</script>

<svelte:element this={level} class="text-base-content text-4xl font-semibold mb-4 text-balance">
	<slot />
</svelte:element>
