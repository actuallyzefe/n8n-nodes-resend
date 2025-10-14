/**
 * Interface for email attachment
 */
export interface IAttachment {
	filename?: string;
	content?: string;
	path?: string;
}

/**
 * Interface for email tag
 */
export interface ITag {
	name: string;
	value: string;
}

/**
 * Interface for email data
 */
export interface IEmailData {
	from: string;
	to: string | string[];
	subject: string;
	html?: string;
	text?: string;
	cc?: string | string[];
	bcc?: string | string[];
	reply_to?: string | string[];
	tags?: ITag[];
	attachments?: IAttachment[];
	scheduled_at?: string;
}

/**
 * Helper function to split comma-separated emails
 */
export function parseEmailList(email: string): string | string[] {
	return email.includes(',') ? email.split(',').map((e) => e.trim()) : email;
}
