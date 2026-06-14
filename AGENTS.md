# Home Apothecary Agent Rules

1. All remedy content is served server-side only. Never client-fetch full remedy content without a server-side `has_access` check first.
2. The Lemon Squeezy webhook endpoint must always verify the webhook signature before processing any payload.
3. License key redemption is one-time only and must be enforced on the server.
4. All health content must be framed as traditional use. Do not make disease-treatment or cure claims.
5. Safety sections for contraindications, interactions, and pregnancy must always be visible. Never collapse or hide them.
