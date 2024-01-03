<script lang="ts">
	import { format } from 'date-fns';

	export let date: Date;
</script>

<div class="text-sm font-medium uppercase">{format(date, 'EEEE d LLLL')}</div>
