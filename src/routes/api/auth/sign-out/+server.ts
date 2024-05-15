import { client } from '$lib/server/stytch';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({ locals }) => {
	const session = locals.session as { session_token: string };

	const result = await client.sessions.revoke({ session_token: session.session_token });

	// Technically do not need this because the session will be invalid so in hooks.server.ts, we'll reject
	// but we can just expire the cookie here
	const headers = new Headers({
		'Set-Cookie': `stytch_session=${session.session_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
		Location: '/sign-in'
	});

	throw redirect(307, '/sign-in');
};
