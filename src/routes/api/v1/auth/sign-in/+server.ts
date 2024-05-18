import { json, error } from '@sveltejs/kit';
import { client } from '$lib/server/stytch';

export const POST = async ({ request }) => {
	/*
	- send a magic link
	- ofc could implement other stuff

	*/

	try {
		const body = await request.json();
		const params = {
			organization_id: body.organization_id,
			email_address: body.email
		};
		const response = await client.magicLinks.email.loginOrSignup(params);
		return json(response);
	} catch (e: any) {
		console.error(e);
		if (e?.status_code === (400 as number)) {
			return error(400, e?.error_message);
		}
	}
};
