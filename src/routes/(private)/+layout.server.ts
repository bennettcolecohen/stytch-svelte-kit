import { redirect } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
	const { session, organization, member } = locals;

	if (!session) {
		console.log('No session in (private) -> go to sign in');
		return redirect(307, '/sign-in');
	}

	// ... whatever else you need to load from your db, etc

	return {
		session: session,
		org: organization,
		user: member
	};
};
