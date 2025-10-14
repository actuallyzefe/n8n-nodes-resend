/**
 * Resend API constants
 */

export const RESEND_API_BASE_URL = 'https://api.resend.com';

export const RESEND_API_ENDPOINTS = {
	// Email endpoints
	EMAILS: '/emails',
	EMAILS_BATCH: '/emails/batch',
	EMAIL_BY_ID: (id: string) => `/emails/${id}`,
	EMAIL_CANCEL: (id: string) => `/emails/${id}/cancel`,

	// Audience endpoints
	AUDIENCES: '/audiences',
	AUDIENCE_BY_ID: (id: string) => `/audiences/${id}`,

	// Contact endpoints
	CONTACTS: (audienceId: string) => `/audiences/${audienceId}/contacts`,
	CONTACT_BY_ID: (audienceId: string, id: string) => `/audiences/${audienceId}/contacts/${id}`,
	CONTACT_BY_EMAIL: (audienceId: string, email: string) =>
		`/audiences/${audienceId}/contacts/${email}`,

	// Broadcast endpoints
	BROADCASTS: '/broadcasts',
	BROADCAST_SEND: (id: string) => `/broadcasts/${id}/send`,
} as const;
