<script lang="ts">
	export let title: string;
</script>

<mjml>
	<mj-head>
		<mj-title>{title}</mj-title>
	</mj-head>
	<mj-body>
		<slot />
	</mj-body>
</mjml>
