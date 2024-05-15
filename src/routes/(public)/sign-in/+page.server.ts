import { client } from '$lib/server/stytch';
import { error } from '@sveltejs/kit';

export const load = async ({ url, locals }) => {
	// Dev -> just set some fixed org
	if (locals.prod == false) {
		const org = {
			organization_id: 'organization-test-c30975b2-725a-4865-97ed-582a4adb3980',
			organization_name: 'Example Org',
			organization_slug: 'exampleslug'
		};

		return {
			org
		};
	}

	// Get the organization from the wildcard slug
	const wildcardSlug = url.href.split('.')[0].split('/').pop() as string;
	let data = await client.organizations.search({});
	const orgs = data?.organizations as any[];
	const org = orgs.find((org) => org.organization_slug === wildcardSlug);

	if (!org) {
		return error(404, 'Organization not found');
	}

	return {
		org
	};
};
