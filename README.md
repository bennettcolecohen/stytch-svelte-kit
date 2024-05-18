# Stytch Svelte Kit Example

There were no docs on how to integrate Stytch properly into a svelte kit app, so I thought it would be useful to make a community example. This is for Stytch B2B Auth.

At the highest level, we're only going to use the Stytch Node SDK and not touch any of the frontend SDKs because they don't play nicely with svelte kit's dual environment setup. We'll handle all auth functions on the server and then pass things to the client when needed.

This is meant to just be a template. There is a lot of logic I left out, especially with error handling. The actual sign in flow is where you'll want to customize things for using org specific/discovery, slugs, etc. 

Let's walk through it:

- For now, we've just done magic links with a simple form and sign in route.

- We set the redirect url in the Stytch Dashboard to a `GET` route at `api/v1/auth/authenticate` where we mint a new session. We pass the session token back to the client with a `set-cookie` header.

- On every request, a handler is run in `hooks.server.ts`. We get the `stytch_session` cookie containing the session token and authenticate it. This will give us the session, organization, and member data. This info is put into `event.locals` so we can easily access it on the server. This is in `hook.server.ts`. 

- All private page routes are in the `(private)/` directory. The parent load function in `+layout.server.ts` simply checks for a session in `locals`. If there is none, we redirect to the sign-in page. 

- In the sign out route, we revoke the session and then set a session token cookie to expire immediately.

—————

In your `.env` file, you'll need to set the `STYTCH_PROJECT_ID` and `STYTCH_SECRET`. We don't need the public token because not using any frontend sdk.

A few more notes for you: 
- In your `.env` file, you'll need to set the `STYTCH_PROJECT_ID` and `STYTCH_SECRET`. We don't need the public token because not using any frontend sdk.
- We use a stytch singleton in `lib/server` and added a path alias in `svelte.config.js`. In svelte kit, this is a reserved directory for anything you want to only be on the server.
- There are bunch of tailwind/ui things in this project just to get some nice defaults. If you want a good way to scaffold a svelte kit project with nice path aliases and tailwind, you can use this (https://www.shadcn-svelte.com/docs/installation)[https://www.shadcn-svelte.com/docs/installation].
