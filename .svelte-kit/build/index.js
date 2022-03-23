
import root from '__GENERATED__/root.svelte';
import { respond } from '/home/jaskaran/repos/enki-website/.svelte-kit/runtime/server/index.js';
import { set_paths, assets, base } from '/home/jaskaran/repos/enki-website/.svelte-kit/runtime/paths.js';
import { set_prerendering } from '/home/jaskaran/repos/enki-website/.svelte-kit/runtime/env.js';
import * as user_hooks from "../../src/hooks.ts";

const template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta name=\"description\" content=\"Enki\" />\n\t\t<title>Enki</title>\n\t\t<link rel=\"icon\" type=\"image/png\" href=\"" + assets + "/enki_icon.jpg\" />\n\t\t<meta\n\t\t\tname=\"viewport\"\n\t\t\tcontent=\"width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86\"\n\t\t/>\n\n\t\t<link\n\t\t\trel=\"preload\"\n\t\t\thref=\"https://cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7_dtp.css\"\n\t\t\tas=\"style\"\n\t\t\tonload='this.onload=null;this.rel=\"stylesheet\"'\n\t\t/>\n\t\t<link rel=\"preconnect\" href=\"https://enki.imgix.net\" />\n\t\t<link rel=\"preconnect\" href=\"https://server.enki.jobspeed.uk\" />\n\t\t<link rel=\"preconnect\" href=\"https://plausible.io\" />\n\t\t<link rel=\"preconnect\" href=\"https://tickettailor.com\" />\n\n\t\t<script\n\t\t\tdefer\n\t\t\tdata-domain=\"enki.jobspeed.uk\"\n\t\t\tsrc=\"https://plausible.io/js/plausible.js\"\n\t\t></script>\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t" + body + "\n\t</body>\n</html>\n";

let read = null;

set_paths({"base":"","assets":""});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			amp: false,
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			dev: false,
			floc: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks: null,
			hydrate: true,
			manifest,
			method_override: {"parameter":"_method","allowed":[]},
			paths: { base, assets },
			prefix: assets + '/_app/',
			prerender: true,
			read,
			root,
			service_worker: null,
			router: true,
			template,
			template_contains_nonce: false,
			trailing_slash: "never"
		};
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		if (!this.options.hooks) {
			const module = await import("../../src/hooks.ts");
			this.options.hooks = {
				getSession: module.getSession || (() => ({})),
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				externalFetch: module.externalFetch || fetch
			};
		}

		return respond(request, this.options, options);
	}
}
