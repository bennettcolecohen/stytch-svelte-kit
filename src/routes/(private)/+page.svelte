<script>
	import { Button } from '$lib/components/ui/button';
	export let data;
	const { session, org, user } = data;

	const handler = async (e) => {
		console.log('boom');
		// make the request to the sign out route
		await fetch('/api/v1/auth/sign-out', {
			method: 'POST'
		});

		// just reload to trigger hooks.server.ts and go away
		window.location.reload();
	};
</script>

<form on:submit|preventDefault={handler}>
	<Button type="submit">Sign Out</Button>
</form>

<pre>
	{JSON.stringify(session, null, 2)}
</pre>
