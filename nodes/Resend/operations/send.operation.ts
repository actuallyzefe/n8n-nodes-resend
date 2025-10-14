import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import type { IEmailData } from './types';
import { parseEmailList } from './types';
import { RESEND_API_ENDPOINTS } from './constants';
import { resendApiRequest } from './helpers';

/**
 * Execute the send email operation
 */
export async function sendEmail(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	// Get required parameters
	const from = this.getNodeParameter('from', index) as string;
	const to = this.getNodeParameter('to', index) as string;
	const subject = this.getNodeParameter('subject', index) as string;
	const bodyType = this.getNodeParameter('bodyType', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	// Build email body
	const body: IEmailData = {
		from,
		to: parseEmailList(to),
		subject,
	};

	// Add body content based on type
	if (bodyType === 'html') {
		body.html = this.getNodeParameter('html', index) as string;
	} else {
		body.text = this.getNodeParameter('text', index) as string;
	}

	// Process additional fields
	if (additionalFields.cc) {
		body.cc = parseEmailList(additionalFields.cc as string);
	}

	if (additionalFields.bcc) {
		body.bcc = parseEmailList(additionalFields.bcc as string);
	}

	if (additionalFields.replyTo) {
		body.reply_to = additionalFields.replyTo as string;
	}

	if (additionalFields.scheduledAt) {
		body.scheduled_at = additionalFields.scheduledAt as string;
	}

	// Process tags
	if (additionalFields.tags) {
		const tagsData = additionalFields.tags as IDataObject;
		if (tagsData.tag && Array.isArray(tagsData.tag)) {
			body.tags = (tagsData.tag as IDataObject[]).map((tag) => ({
				name: tag.name as string,
				value: tag.value as string,
			}));
		}
	}

	// Process attachments
	if (additionalFields.attachments) {
		const attachmentsData = additionalFields.attachments as IDataObject;
		if (attachmentsData.attachment && Array.isArray(attachmentsData.attachment)) {
			body.attachments = [];

			for (const attachment of attachmentsData.attachment as IDataObject[]) {
				const attachmentType = attachment.attachmentType as string;

				if (attachmentType === 'binary') {
					const binaryPropertyName = attachment.binaryProperty as string;
					const binaryData = this.helpers.assertBinaryData(index, binaryPropertyName);
					const dataBuffer = await this.helpers.getBinaryDataBuffer(index, binaryPropertyName);

					body.attachments.push({
						filename: attachment.filename
							? (attachment.filename as string)
							: binaryData.fileName || 'attachment',
						content: dataBuffer.toString('base64'),
					});
				} else if (attachmentType === 'url') {
					body.attachments.push({
						filename: attachment.filename as string,
						path: attachment.path as string,
					});
				}
			}
		}
	}

	// Make API request
	const responseData = await resendApiRequest.call(this, 'POST', RESEND_API_ENDPOINTS.EMAILS, body as unknown as IDataObject);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
