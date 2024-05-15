import { client } from '$lib/server/stytch';
import { redirect } from '@sveltejs/kit';

export const GET = async ({ url }) => {
	// Authenticate the magic link token
	const token = url.searchParams.get('token');
	const result = await client.magicLinks.authenticate({
		magic_links_token: token ?? '',
		session_duration_minutes: 600
	});

	// Check if member is authenticated and set the session token cookie
	// IMPORTANT: must be called stytch_session

	if (result?.member_authenticated) {
		const isProd = !url.hostname.includes('localhost');
		const secureAttribute = isProd ? 'Secure;' : '';

		const headers = new Headers({
			'Set-Cookie': `stytch_session=${result.session_token}; Path=/; HttpOnly; ${secureAttribute} SameSite=Lax; Max-Age=36000`,
			Location: '/'
		});
		return new Response(null, { status: 307, headers });
	} else {
		// Redirect to sign-in if authentication fails
		const headers = new Headers({
			Location: '/sign-in'
		});
		return new Response(null, { status: 307, headers });
	}
};
