<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';

	function invokeServiceWorkerUpdateFlow(registration: ServiceWorkerRegistration) {
		if (confirm('New version of the app is available. Refresh now?')) {
			if (registration.waiting) {
				registration.waiting.postMessage({ type: 'SKIP_WAITING' });
			}
		}
	}

	let registration: ServiceWorkerRegistration;

	function checkForServiceWorkerUpdate() {
		if (!registration) {
			return;
		}

		registration.update();
	}

	$: $page.url.pathname, checkForServiceWorkerUpdate();

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			registration = await navigator.serviceWorker.register('/service-worker.js', {
				type: dev ? 'module' : 'classic'
			});

			// ensure the case when the updatefound event was missed is also handled
			// by re-invoking the prompt when there's a waiting Service Worker
			if (registration.waiting) {
				invokeServiceWorkerUpdateFlow(registration);
			}

			// detect Service Worker update available and wait for it to become installed
			registration.addEventListener('updatefound', () => {
				if (registration.installing) {
					// wait until the new Service worker is actually installed (ready to take over)
					registration.installing.addEventListener('statechange', () => {
						if (registration.waiting) {
							// if there's an existing controller (previous Service Worker), show the prompt
							if (navigator.serviceWorker.controller) {
								invokeServiceWorkerUpdateFlow(registration);
							} else {
								// otherwise it's the first install, nothing to do
							}
						}
					});
				}
			});

			let refreshing = false;

			// detect controller change and refresh the page
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (!refreshing) {
					window.location.reload();
					refreshing = true;
				}
			});
		}
	});
</script>

<div class="pt-safe pb-safe mx-auto h-full w-full max-w-lg">
	<slot />
</div>
