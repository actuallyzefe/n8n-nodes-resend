import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the create broadcast operation
 */
export async function createBroadcast(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;
	const from = this.getNodeParameter('from', index) as string;
	const subject = this.getNodeParameter('subject', index) as string;
	const bodyType = this.getNodeParameter('bodyType', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = {
		audience_id: audienceId,
		from,
		subject,
	};

	// Add body content based on type
	if (bodyType === 'html') {
		const html = this.getNodeParameter('html', index) as string;
		if (!html) {
			throw new NodeOperationError(this.getNode(), 'HTML body is required when body type is HTML', {
				itemIndex: index,
			});
		}
		body.html = html;
	} else {
		const text = this.getNodeParameter('text', index) as string;
		if (!text) {
			throw new NodeOperationError(this.getNode(), 'Text body is required when body type is Text', {
				itemIndex: index,
			});
		}
		body.text = text;
	}

	// Add optional fields
	if (additionalFields.replyTo) {
		body.reply_to = additionalFields.replyTo;
	}

	if (additionalFields.name) {
		body.name = additionalFields.name;
	}

	const responseData = await resendApiRequest.call(this, 'POST', RESEND_API_ENDPOINTS.BROADCASTS, body as unknown as IDataObject);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
