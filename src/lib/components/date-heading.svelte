<script lang="ts">
	import { format, isToday, isYesterday } from 'date-fns';

	export let date: Date;

	function formatDate(date: Date): string {
		if (isToday(date)) {
			return 'Today';
		}

		if (isYesterday(date)) {
			return 'Yesterday';
		}

		return format(date, 'EEEE d LLLL');
	}
</script>

<div class="text-sm font-medium uppercase">{formatDate(date)}</div>
