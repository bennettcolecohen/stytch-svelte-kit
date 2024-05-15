import { client } from '$lib/server/stytch';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	/* 
    Note: 
        - This runs on every server request
        - event.locals will disappear after the request is complete. This is why we need to rely on cookies for session
        - We use session token (stytch_session) to get the session instead of the jwt
        - Note we added the new local props to the Locals type in src/app.d.ts
        */

	// Get env + session
	event.locals.prod = !event.url.hostname.includes('localhost');
	const sessionToken = event.cookies.get('stytch_session') as string;

	// No token = No Session
	// In /(private)/+layout.server.ts, we'll see no session and redirect back to /(public)/sign-in
	if (!sessionToken) {
		event.locals.session = null;
		event.locals.organization = null;
		event.locals.member = null;
		return resolve(event);
	}

	try {
		// Get the session and set locals
		const session = await client.sessions.authenticate({ session_token: sessionToken });
		event.locals.session = session;
		event.locals.organization = session.organization;
		event.locals.member = session.member;

		return resolve(event);
	} catch (e) {
		event.cookies.delete('stytch_session', { path: '/' });
		event.locals.session = null;
		event.locals.organization = null;
		event.locals.member = null;

		return resolve(event);
	}
};
