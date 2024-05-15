import * as stytch from 'stytch';
import { env } from '$env/dynamic/private'; // private environment variables

export const client: stytch.B2BClient = new stytch.B2BClient({
	project_id: env.STYTCH_PROJECT_ID,
	secret: env.STYTCH_SECRET
});
