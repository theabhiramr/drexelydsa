/**
 * @file index.ts
 * @description This is the entry point for the Action Network Proxy Worker. It listens for incoming requests and forwards them to the Action Network API, adding the necessary authentication headers and handling any CORS issues.
 * @author Abhiram Ramachandran <ramachandran.abhiram@gmail.com>
 * @see https://developers.cloudflare.com/workers/ for more information on Cloudflare Workers.
 *
 * (c) 2026 Drexel YDSA. All rights reserved.
 *
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const AN_API_URL = env.AN_API_URL || 'https://actionnetwork.org/api/v2';
		const AN_API_KEY = env.AN_API_KEY;

		// CORS headers (applied to all responses)
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		};

		// Handle CORS preflight
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		// Extract endpoint from the request URL
		const url = new URL(request.url);
		const endpoint = url.pathname.replace(/^\/api/, ''); // Remove the /api prefix

		// Construct the target URL for the Action Network API
		const targetUrl = `${AN_API_URL}${endpoint}${url.search}`;

		// Forward the request to the Action Network API
		const apiResponse = await fetch(targetUrl, {
			method: request.method,
			headers: {
				'Content-Type': 'application/json',
				'OSDI-API-Token': AN_API_KEY,
			},
			body: request.method !== 'GET' ? await request.text() : undefined,
		});

		// Return the response from the Action Network API, adding CORS headers
		// Don't spread apiResponse.headers - it may contain CORS headers causing duplicates
		return new Response(apiResponse.body, {
			status: apiResponse.status,
			headers: {
				'Content-Type': 'application/json',
				...corsHeaders,
			},
		});
	},
} satisfies ExportedHandler<Env>;
