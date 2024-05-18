<script>
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	// Get the org for use in the UI
	export let data;
	const { org } = data;

	// State
	let loading = false;
	let success = false;
	let email = null;

	const handler = async (e) => {
		// call the sign in route
		loading = true;
		const response = await fetch('/api/v1/auth/sign-in', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: e.target.email.value,
				organization_id: org.organization_id
			})
		});

		// errors
		if (!response.ok) {
			if (response.status === 400) {
				toast.error('No active account found with that email address.', {
					position: 'top-right'
				});
			} else {
				toast.error('An error occurred. Please try again.', {
					position: 'top-right'
				});
			}
			return;
		}

		// swap the UI to show the success message
		success = true;
	};
</script>

<svelte:head>
	<title>Sign in to {org.organization_name} | Camber</title>
</svelte:head>

<div class="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-100">
	{#if !success}
		<div class="w-96">
			<div class="mt-8">
				<h1 class="text-xl">Sign in to {org.organization_name}</h1>
				<p class="mt-2 text-gray-500">{org.organization_slug}.example.com</p>
			</div>

			<form on:submit|preventDefault={handler} class="mt-8 flex w-full flex-col gap-y-8">
				<div class="w-full">
					<Label required>Email</Label>
					<Input
						disabled={loading}
						class="mt-1"
						required
						bind:value={email}
						name="email"
						type="email"
						placeholder="tony@starkindustries.com"
					/>
				</div>
				<Button type="submit" disabled={loading} variant="default" size="lg">
					<span class="text-white">Continue</span>
				</Button>
			</form>
		</div>
	{:else}
		<div class="w-96">
			<div class="mt-8">
				<h1 class="text-xl">Check your email</h1>
				<p class="mt-6 text-gray-500">
					We emailed a magic link to {email}. Click the link to sign in.
				</p>
			</div>
		</div>
	{/if}
</div>
