// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: "https://61a43d02973d0f93a7a4e4ec69188cd5@o1281312.ingest.sentry.io/4506670953594880",

	// Adjust this value in production, or use tracesSampler for greater control
	tracesSampleRate: 1,

	// Setting this option to true will print useful information to the console while you're setting up Sentry.
	debug: false,
	environment: process.env.ENVIRONMENT,
	enabled: process.env.ENVIRONMENT !== "development"
});
