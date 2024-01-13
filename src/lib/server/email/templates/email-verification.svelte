<script lang="ts">
	import Email from './parts/email.svelte';

	export let title: string;
	export let name: string;
</script>

<Email {title}>
	<mj-section>
		<mj-column>
			<mj-button
				color="#fff"
				background-color="#ff3e00"
				font-family="Helvetica"
				href="https://svelte.dev"
			>
				Learn Svelte with {name}
			</mj-button>
		</mj-column>
	</mj-section>
</Email>
