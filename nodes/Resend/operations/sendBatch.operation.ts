import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import type { IEmailData } from './types';
import { parseEmailList } from './types';
import { RESEND_API_ENDPOINTS } from './constants';
import { resendApiRequest } from './helpers';

/**
 * Execute the send batch emails operation
 */
export async function sendBatchEmails(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const emailsData = this.getNodeParameter('emails', index, {}) as IDataObject;
	const options = this.getNodeParameter('options', index, {}) as IDataObject;

	if (!emailsData.email || !Array.isArray(emailsData.email)) {
		throw new NodeOperationError(this.getNode(), 'No emails provided for batch send', {
			itemIndex: index,
		});
	}

	const emails: IEmailData[] = [];
	const batchSizeLimit = (options.batchSizeLimit as number) || 100;

	for (const email of emailsData.email as IDataObject[]) {
		if (emails.length >= batchSizeLimit) {
			throw new NodeOperationError(
				this.getNode(),
				`Batch size exceeds limit of ${batchSizeLimit} emails`,
				{ itemIndex: index },
			);
		}

		const emailData: IEmailData = {
			from: email.from as string,
			to: email.to as string,
			subject: email.subject as string,
		};

		// Add body content
		const bodyType = email.bodyType as string;
		if (bodyType === 'html') {
			emailData.html = email.html as string;
		} else {
			emailData.text = email.text as string;
		}

		// Add optional fields
		if (email.cc) {
			emailData.cc = parseEmailList(email.cc as string);
		}

		if (email.bcc) {
			emailData.bcc = parseEmailList(email.bcc as string);
		}

		if (email.replyTo) {
			emailData.reply_to = email.replyTo as string;
		}

		emails.push(emailData);
	}

	if (emails.length === 0) {
		throw new NodeOperationError(
			this.getNode(),
			'At least one email must be provided for batch send',
			{ itemIndex: index },
		);
	}

	// Make API request
	const responseData = await resendApiRequest.call(
		this,
		'POST',
		RESEND_API_ENDPOINTS.EMAILS_BATCH,
		emails as unknown as IDataObject,
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
